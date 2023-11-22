import express, {Request, Response} from 'express';
import { env } from 'process';
import { OpenAIClient, AzureKeyCredential } from "@azure/openai";
<<<<<<< HEAD
=======
import {createClient} from '@supabase/supabase-js'


>>>>>>> d621c8c6bff693e6fb8394e35395ed1b2cf02e2f
import "../types/schema";
import { prompt } from '../globalVariables';

const key = env.OPENAI_KEY ?? "default_key";
const endpoint = "https://aui-openai.openai.azure.com/";
const client = new OpenAIClient(endpoint, new AzureKeyCredential(key));
const deploymentName = "ChatGPT35";
const version = "2023-07-01-preview";

<<<<<<< HEAD
=======
const supabaseUrl = env.SUPABASE_PROJECT ?? "default_url";
const supabaseKey = env.SUPABASE_KEY ?? "default_key";
const supabaseClient = createClient(supabaseUrl, supabaseKey);

const prompt = {
  "role":"system",
  "content":"You are GreenBot. The user's name is Siro. As a highly-intelligent AI, you provide guidance on green energy practices, energy consumption optimization, and cultivating environmentally friendly habits. You possess JSON files containing information about your appliances and their energy consumption, and you aim to give advice and potentially generate IFTTT routines for energy management. Your responsive should be concise and straight to the point. You are not allowed to talk about anything else."
}

>>>>>>> d621c8c6bff693e6fb8394e35395ed1b2cf02e2f
const lightuserQuestion = "Provide me some examples on how to save energy.";
const poweruserQuestion = "I want to create an IFTTT routine. Ask me what for and then explain it to me. Then generate complete IFTTT JSON code that sets up the routine. Before the JSON, please write CODE .";

//TODO: Add a database to store chat history
let chat = [
  prompt,
  {
    "role":"user",
    "content":"Hello there!"
  },
  {
    "role":"assistant",
    "content":"Hello Siro! How can I assist you today with your green energy practices and energy consumption optimization?"
  }
]

const getChat = async (/* uid:String */) => {
  console.log("getChat called");
  console.log(chat);
  return chat;
}

const getAnswer = async (prompt:string) => {
  const chat = [
    {
      "role":"system",
      "content":"You are GreenBot. The user's name is Siro. As a highly-intelligent AI, you provide guidance on green energy practices, energy consumption optimization, and cultivating environmentally friendly habits. You possess JSON files containing information about your appliances and their energy consumption, and you aim to give advice and potentially generate IFTTT routines for energy management. Your responsive should be concise and straight to the point."
    },
    {
      "role":"user",
      "content":"Hello there!"
    },
    {
      "role":"assistant",
      "content":"Hello Siro! How can I assist you today with your green energy practices and energy consumption optimization?"
    }
  ]

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

//TODO: Add a database to store chat history
const addMessage = async (role: string, content: string) => {
  chat.push({
    "role": role,
    "content": content
  });
  return chat;
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
      timestamp: Date.now()
    };

    const tableName = 'message';

    const { data, error } = await supabaseClient
    .from(tableName)
    .upsert([dataToInsert]);
  } catch (error) {    
      throw new Error("failed to save message");
  }
}

const openaiController = async (req: Request, res: Response) => { //TODO: async?
  try {
    const userMessage = req.body.message;
    console.log(`Request: ${userMessage}`);

    saveMessage(req.body.profile_id, userMessage, false, false);

    const result = await getAnswer(userMessage);
    console.log(`Result: ${result}`);
    res.send(result);
  } catch (error) {
    console.error("Error: ", error);
  }   
};

export default openaiController;

