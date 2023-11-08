import {Request, Response} from 'express';

const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");

const openaiController = async (req: Request, res: Response) => {
  // Replace with your Azure OpenAI key
  const key = "a4f7ac34a6ea4b528b92cdbe17b446d5";
  const endpoint = "https://aui-openai.openai.azure.com/";
  const client = new OpenAIClient(endpoint, new AzureKeyCredential(key));

  const examplePrompts = [
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
  }
};

export default openaiController;

