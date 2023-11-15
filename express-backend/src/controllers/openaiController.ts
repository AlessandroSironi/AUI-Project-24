import express, {Request, Response} from 'express';
import { env } from 'process';

//const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");

import { OpenAIClient, AzureKeyCredential } from "@azure/openai";

//app.use(express.json());
//app.use(express.urlencoded({ extended: true }));

//app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
//app.use(bodyParser.json())

const key = env.OPENAI_KEY ?? "default_key";
const endpoint = "https://aui-openai.openai.azure.com/";
//const endpoint = "https://aui-openai.openai.azure.com/openai/deployments/ChatGPT35/chat/completions?api-version=2023-07-01-preview"
const client = new OpenAIClient(endpoint, new AzureKeyCredential(key));
const deploymentName = "ChatGPT35";
const version = "2023-07-01-preview";

//TODO: Add a database to store chat history
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

const openaiController = async (req: Request, res: Response) => { //TODO: async?
  try {
    const request = req.body.message;
    console.log(`Request: ${request}`);

    const result = await getAnswer(request);
    console.log(`Result: ${result}`);

    res.send(result);

  } catch (error) {
    console.error("Error: ", error);
  }   
};

export default openaiController;

