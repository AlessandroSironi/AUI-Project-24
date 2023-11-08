import {Request, Response} from 'express';

const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");

const openaiController = async (req: Request, res: Response) => {
  try {
    // Replace with your Azure OpenAI key
    const key = 'a4f7ac34a6ea4b528b92cdbe17b446d5';
    const endpoint = "https://aui-openai.openai.azure.com/";
    //const endpoint = "https://aui-openai.openai.azure.com/openai/deployments/ChatGPT35/chat/completions?api-version=2023-07-01-preview"
    const client = new OpenAIClient(endpoint, new AzureKeyCredential(key));


  /*   const examplePrompts = [
      "How are you today?",
      "What is Azure OpenAI?",
      "Why do children love dinosaurs?",
      "Generate a proof of Euler's identity",
      "Describe in single words only the good things that come into your mind about your mother.",
    ];

    const deploymentName = "text-davinci-003";

    let promptIndex = 0;
    const { choices } = await client.getCompletions(deploymentName, examplePrompts);
    for (const choice of choices) {
      const completion = choice.text;
      console.log(`Input: ${examplePrompts[promptIndex++]}`);
      console.log(`Chatbot: ${completion}`);
    } */

    //Generate a single completion
    const examplePrompt = "Once upon a time";
    const deploymentName = "ChatGPT35";
    const version = "2023-07-01-preview";
    const { choices } = await client.getCompletions(deploymentName, examplePrompt, { apiVersion: version });
    const completion = choices[0].text;
    console.log(`Input: ${examplePrompt}`);
    console.log(`Chatbot: ${completion}`);
    res.send(`Input: ${completion}`);
  } catch (error) {
    console.error(error);
  } 

  //res.send('Hello from the openAI controller');
  
};

export default openaiController;

