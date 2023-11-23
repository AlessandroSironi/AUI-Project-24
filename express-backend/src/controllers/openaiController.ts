import express, {Request, Response} from 'express';
import { env } from 'process';
import { OpenAIClient, AzureKeyCredential } from "@azure/openai";
import {createClient} from '@supabase/supabase-js'
import "../types/schema";
import {prompt, lightuserQuestion, poweruserQuestion, routinePrompt} from '../globalVariables';
import {retrieveChat} from './chatController';

const key = env.OPENAI_KEY ?? "default_key";
const endpoint = "https://aui-openai.openai.azure.com/";
const client = new OpenAIClient(endpoint, new AzureKeyCredential(key));
const deploymentName = "ChatGPT35";
const version = "2023-07-01-preview";

const supabaseUrl = env.SUPABASE_PROJECT ?? "default_url";
const supabaseKey = env.SUPABASE_KEY ?? "default_key";
const supabaseClient = createClient(supabaseUrl, supabaseKey);

const getAnswer = async (question:string, profile_id:string, isPower: boolean) => {
  const chatHistoryDB = await retrieveChat(profile_id);
  
  let chat = [];
  chat.push(prompt);

  for (const message of chatHistoryDB) {
    console.log("message:" + message.message);
    chat.push({
      "role": message.is_chatgpt ? "system" : "user",
      "content": message.message
    });
  }
  if(isPower)
    chat.push({
      "role":"user",
      "content":routinePrompt + question
    });
  else
    chat.push({
      "role":"user",
      "content":question
    });

  try {
    const result = await client.getChatCompletions(deploymentName, chat, { maxTokens: 512 }/* , { apiVersion: version } */);
    for (const choice of result.choices) {
      if (choice.message) console.log(`Chatbot: ${choice.message.content}`);
    }
    return result;
  } catch (error) {
    console.error("getAnser error: ", error);
  }
}

const startchatLightuser = async () => {

}

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

    const { data, error } = await supabaseClient
    .from(tableName)
    .upsert([ dataToInsert ]);
    if (error) console.log("Error: ", error);
    //console.log("Saved message: ", dataToInsert.message);
  } catch (error) {    
      throw new Error("failed to save message");
  }
}

const openaiController = async (req: Request, res: Response) => { 
  try {
    const userMessage = req.body.message;
    let isPower = req.body.isPower; 
    if (isPower==null) isPower=false;
    console.log(`Request: ${userMessage}`);

    saveMessage(req.body.profile_id, userMessage, false, false);

    const result = await getAnswer(userMessage, req.body.profile_id, req.body.isPower);
    
    if(result){
      const chatgptAnswer = result.choices[0].message?.content ?? "chatgptAnswer";
      //console.log(chatgptAnswer);

      const isRoutine = checkIfRoutine(chatgptAnswer);
      saveMessage(req.body.profile_id, chatgptAnswer, true, isRoutine);
    }
    res.send(result);
  } catch (error) {
    console.error("Error: ", error);
  }   
};

export default openaiController;