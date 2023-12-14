import express, { Request, Response, response } from 'express';
import { env } from 'process';
import { OpenAIClient, AzureKeyCredential } from '@azure/openai';
import { createClient } from '@supabase/supabase-js';
import { prompt, poweruserQuestion, explanationPrompt } from '../globalVariables';
import { Database } from '../types/schema';
import { MESSAGE_LIMIT } from '../globalVariables';
import { z } from 'zod';
import { checkIfRoutine, extractYAMLName, extractYAMLString } from '../helpers/parserModule';

const key = env.OPENAI_KEY ?? 'default_key';
const endpoint = 'https://aui-openai.openai.azure.com/';
const client = new OpenAIClient(endpoint, new AzureKeyCredential(key));
const deploymentName = 'ChatGPT35';
const version = '2023-07-01-preview';

const supabaseUrl = env.SUPABASE_PROJECT ?? 'default_url';
const supabaseKey = env.SUPABASE_KEY ?? 'default_key';
const supabaseClient = createClient<Database>(supabaseUrl, supabaseKey);

const retrieveChat = async (profile_id: string, messagesNumber: number) => {
    try {
        const { data, error } = await supabaseClient.from('message').select('*').eq('profile_id', profile_id).order('timestamp', { ascending: false }).limit(messagesNumber);

        if (data) {
            console.log('-----------------');
            console.log(data.reverse());
            return data.reverse();
        } else throw new Error('Data is null');
    } catch (error) {
        console.error('retrieveChatHistory error: ', error);
        throw error;
    }
};

async function personalize_prompt(id: string) {
    let personalized_prompt = prompt;
    const { data, error } = await supabaseClient.from('profiles').select('username').eq('id', id).single();
    const username = data?.username ?? '';
    //console.log("Retrieved username: " + username);
    personalized_prompt.content = personalized_prompt.content.replace('USERNAME', username);
    //console.log("Personalized prompt: " + personalized_prompt.content)
    return personalized_prompt;
}

const getAnswer = async (question: string, profile_id: string) => {
    const chatHistoryDB = await retrieveChat(profile_id, 5);
    let chat = [];
    let prompt_personalized = await personalize_prompt(profile_id);
    //console.log("Personalized prompt IN GET ANSWER" + prompt_personalized.content)
    chat.push(prompt_personalized);

    let list_appliances = [];
    try {
        const { data, error }: { data: any; error: any } = await supabaseClient.from('appliance').select('id, appliance_name, appliance_type, room, brand, avg_consumption, appliance_type(type)').eq('profile_id', profile_id);
        for (const item of data) {
            item['appliance_type'] = item['appliance_type']['type'];
            list_appliances.push(JSON.stringify(item));
        }
        //list_appliances = JSON.stringify(data);
    } catch (error) {
        console.error('Error: ', error);
    }
    //console.log('list_appliances: ' + list_appliances);

    for (const message of chatHistoryDB) {
        //console.log('message:' + message.message);
        chat.push({
            role: message.is_chatgpt ? 'system' : 'user',
            content: message.message,
        });
    }
    const appliancesPrompt = 'These are the users appliances: ' + list_appliances + '. ';

    chat.push(
        {
            role: 'system',
            content: explanationPrompt,
        },
        {
            role: 'system',
            content: appliancesPrompt,
        },
        {
            role: 'user',
            content: poweruserQuestion,
        },
        {
            role: 'user',
            content: question,
        }
    );

    let yaml = '';
    try {
        const result = await client.getChatCompletions(deploymentName, chat, { maxTokens: 512 } /* , { apiVersion: version } */);
        for (const choice of result.choices) {
            if (choice.message) {
                console.log(`Chatbot: ${choice.message.content}`);
                //console.log(result.choices.length);
                yaml = extractYAMLString(choice.message.content?.toString() ?? '');
            }
        }
        return result;
    } catch (error) {
        console.error('getAnser error: ', error);
    }
};

const saveMessage = async (profile_id: string, message: string, is_chatgpt: boolean, is_routine: boolean) => {
    try {
        const dataToInsert = {
            profile_id: profile_id,
            message: message,
            is_chatgpt: is_chatgpt,
            is_routine: is_routine,
            //timestamp: Date.now() this line breaks the function
        };

        const tableName = 'message';

        const { data, error } = await supabaseClient.from(tableName).upsert(dataToInsert);
        if (error) console.log('Error: ', error);
        //console.log("Saved message: ", dataToInsert.message);
    } catch (error) {
        throw new Error('failed to save message');
    }
};

//POST: requires user message, profile_id and isPower flag (optional, to be set if the user is asking for a routine)
// the API generates a response from chatgpt and saves both request and response in the db
const openaiHandler = async (req: Request, res: Response) => {
    try {
        const userMessage = req.body.message;
        const profile_id = req.query.profile_id as string;
        const validationMessage = z.string();
        const validationProfileID = z.string();
        try {
            validationMessage.parse(userMessage);
            validationProfileID.parse(profile_id);
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
            return;
        }

        //console.log(`Request: ${userMessage}`);

        saveMessage(profile_id, userMessage, false, false);

        const result = await getAnswer(userMessage, profile_id);

        let yaml = ''; // Declare the 'yaml' variable
        let yamlName = '';
        if (result) {
            const chatgptAnswer = result.choices[0].message?.content ?? 'chatgptAnswer';
            const isRoutine = checkIfRoutine(chatgptAnswer);

            if (isRoutine) {
                yaml = extractYAMLString(chatgptAnswer.toString() ?? '');
                yamlName = extractYAMLName(yaml);
                /* const dataToInsert = {
                    profile_id: profile_id,
                    routine_name: yamlName,
                    json: yaml,
                }; */
            }

            saveMessage(profile_id, chatgptAnswer, true, isRoutine);

            const responseData = {
                message: chatgptAnswer,
                routine: {
                    routineName: yamlName,
                    routineJSON: yaml,
                },
                is_routine: isRoutine,
            };
            console.log(responseData);
            res.send(responseData);
        }
    } catch (error) {
        console.error('Error: ', error);
    }
};

/* const insertRoutine = async (dataToInsert: any) => {
    try {
        const tableName = 'routine';
        const { data, error } = await supabaseClient.from(tableName).insert(dataToInsert);
        //console.log('Inserted routine: ', dataToInsert.routine_name);
    } catch (error) {
        console.error(error);
    }
}; */

export default openaiHandler;
