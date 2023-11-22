import express, {Request, Response} from 'express';
import { env } from 'process';
import { OpenAIClient, AzureKeyCredential } from "@azure/openai";
import {createClient} from '@supabase/supabase-js'
import "../types/schema";
import {prompt, lightuserQuestion, poweruserQuestion} from '../globalVariables';
import {retrieveChat} from './chatControllers/retrieveChatController';

const key = env.OPENAI_KEY ?? "default_key";
const endpoint = "https://aui-openai.openai.azure.com/";
const client = new OpenAIClient(endpoint, new AzureKeyCredential(key));
const deploymentName = "ChatGPT35";
const version = "2023-07-01-preview";

const supabaseUrl = env.SUPABASE_PROJECT ?? "default_url";
const supabaseKey = env.SUPABASE_KEY ?? "default_key";
const supabaseClient = createClient(supabaseUrl, supabaseKey);

const getAnswer = async (prompt:string, profile_id:string) => {
  const chatHistoryDB = await retrieveChat(profile_id);

  let chat = [];
  for (const message of chatHistoryDB) {
    chat.push({
      "role": message.is_chatgpt ? "system" : "user",
      "content": message.message
    });
  }

  chat.push({
    "role":"user",
    "content":prompt
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
    console.log("Saved message: ", dataToInsert.message);
  } catch (error) {    
      throw new Error("failed to save message");
  }
}

const openaiController = async (req: Request, res: Response) => { //TODO: async?
  try {
    const userMessage = req.body.message;
    console.log(`Request: ${userMessage}`);

    saveMessage(req.body.profile_id, userMessage, false, false);

    const result = await getAnswer(userMessage, req.body.profile_id);
    
    if(result){
      const chatgptAnswer = result.choices[0].message?.content ?? "chatgptAnswer";
      console.log(chatgptAnswer);
      saveMessage(req.body.profile_id, chatgptAnswer, true, false); //TODO: is_routine
    }
    res.send(result);
  } catch (error) {
    console.error("Error: ", error);
  }   
};

export default openaiController;