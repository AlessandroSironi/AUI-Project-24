import express, { Request, Response } from 'express';
import { env } from 'process';
import { OpenAIClient, AzureKeyCredential } from '@azure/openai';
import { createClient } from '@supabase/supabase-js';
import { prompt, lightuserQuestion, poweruserQuestion, routinePrompt } from '../globalVariables';
import { Database } from '../types/schema';
import { z } from 'zod';

const key = env.OPENAI_KEY ?? 'default_key';
const endpoint = 'https://aui-openai.openai.azure.com/';
const client = new OpenAIClient(endpoint, new AzureKeyCredential(key));
const deploymentName = 'ChatGPT35';
const version = '2023-07-01-preview';

const supabaseUrl = env.SUPABASE_PROJECT ?? 'default_url';
const supabaseKey = env.SUPABASE_KEY ?? 'default_key';
const supabaseClient = createClient<Database>(supabaseUrl, supabaseKey);

const MESSAGE_LIMIT = 25;

const retrieveChat = async (profile_id: string) => {

  try {
    const { data, error } = await supabaseClient
      .from('message')
      .select('*')
      .eq('profile_id', profile_id)
      .order('timestamp', { ascending: false })
      .limit(MESSAGE_LIMIT);

      if (data) return data.reverse();
      else throw new Error('Data is null');
  } catch (error) {
    console.error("retrieveChatHistory error: ", error);
    throw error;
  }
}
        if (data) return data;
        else throw new Error('Data is null');
    } catch (error) {
        console.error('retrieveChatHistory error: ', error);
        throw error;
    }
};

const getAnswer = async (question: string, profile_id: string, isPower: boolean) => {
    const chatHistoryDB = await retrieveChat(profile_id);
    let chat = [];
    chat.push(prompt);

    for (const message of chatHistoryDB) {
        console.log('message:' + message.message);
        chat.push({
            role: message.is_chatgpt ? 'system' : 'user',
            content: message.message,
        });
    }
    if (isPower)
        chat.push({
            role: 'user',
            content: routinePrompt + question,
        });
    else
        chat.push({
            role: 'user',
            content: question,
        });

    try {
        const result = await client.getChatCompletions(deploymentName, chat, { maxTokens: 512 } /* , { apiVersion: version } */);
        for (const choice of result.choices) {
            if (choice.message) console.log(`Chatbot: ${choice.message.content}`);
        }
        return result;
    } catch (error) {
        console.error('getAnser error: ', error);
    }
};

function checkIfRoutine(chatgptAnswer: string): boolean {
    return chatgptAnswer.includes('ROUTINE'); //TODO: find unique pattern for json routines
}

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

        const { data, error } = await supabaseClient.from(tableName).upsert([dataToInsert]);
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
        let isPower = req.body.isPower;
        if (isPower == null) isPower = false;
        console.log(`Request: ${userMessage}`);

        saveMessage(profile_id, userMessage, false, false);

        const result = await getAnswer(userMessage, profile_id, req.body.isPower);

        if (result) {
            const chatgptAnswer = result.choices[0].message?.content ?? 'chatgptAnswer';
            //console.log(chatgptAnswer);

            const isRoutine = checkIfRoutine(chatgptAnswer);
            saveMessage(profile_id, chatgptAnswer, true, isRoutine);
            res.send(chatgptAnswer);
        }
    } catch (error) {
        console.error('Error: ', error);
    }
};

export default openaiHandler;
