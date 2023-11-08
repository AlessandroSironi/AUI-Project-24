import {Request, Response} from 'express';

const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");

const openaiController = async (req: Request, res: Response) => {
  try {
    // Replace with your Azure OpenAI key
    const key = 'a4f7ac34a6ea4b528b92cdbe17b446d5';
    const endpoint = "https://aui-openai.openai.azure.com/";
    //const endpoint = "https://aui-openai.openai.azure.com/openai/deployments/ChatGPT35/chat/completions?api-version=2023-07-01-preview"
    const client = new OpenAIClient(endpoint, new AzureKeyCredential(key));
    const deploymentName = "ChatGPT35";
    const version = "2023-07-01-preview";

     /* const examplePrompts = [
      "How are you today?",
      "What is Azure OpenAI?",
      "Why do children love dinosaurs?",
      "Generate a proof of Euler's identity",
      "Describe in single words only the good things that come into your mind about your mother.",
    ]; */

    // Create an array of objects with "role" and "content" properties
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

    const request = "I want to use less energy in my home. What should I do?"

    // Append request to chat array
    chat.push({
      "role":"user",
      "content":request
    });

    /* const { choices } = await client.getCompletions(deploymentName, chat, { apiVersion: version });
    for (const choice of choices) {
      const completion = choice.text;
      console.log(`Input: ${choice}.content.text`);
      console.log(`Chatbot: ${completion}`);
    } */
  
    console.log(`Messages: ${chat.map((m) => m.content).join("\n")}`);

    const result = await client.getChatCompletions(deploymentName, chat, { maxTokens: 128 }, { apiVersion: version });
    for (const choice of result.choices) {
      console.log(`Chatbot: ${choice.message.content}`);
    }

    res.send(result)
  

    /* let promptIndex = 0;
    const { choices } = await client.getCompletions(deploymentName, examplePrompts, { apiVersion: version });
    for (const choice of choices) {
      const completion = choice.text;
      console.log(`Input: ${examplePrompts[promptIndex++]}`);
      console.log(`Chatbot: ${completion}`);
    }  */

  /*   //Generate a single completion
    const examplePrompt = "Once upon a time";

    const { choices2 } = await client.getCompletions(deploymentName, examplePrompt, { apiVersion: version });
    const completion = choices2[0].text;
    console.log(`Input: ${examplePrompt}`);
    console.log(`Chatbot: ${completion}`);
    res.send(`Input: ${completion}`); */
  } catch (error) {
    console.error(error);
  } 

  //res.send('Hello from the openAI controller');
  
};

export default openaiController;

