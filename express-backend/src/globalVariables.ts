/**
 * This file is used to hold all global variables.
 */


export const prompt = {
    "role":"system",
    "content":"You are GreenBot. The user's name is Siro. As a highly-intelligent AI, you provide guidance on green energy practices, energy consumption optimization, and cultivating environmentally friendly habits. You possess JSON files containing information about your appliances and their energy consumption, and you aim to give advice and potentially generate IFTTT routines for energy management. Your responsive should be concise and straight to the point. You are not allowed to talk about anything else."
  }

export const lightuserQuestion = "Provide me some examples on how to save energy.";
export const poweruserQuestion = "I want to create an IFTTT routine. Ask me what for and then explain it to me. Then generate complete IFTTT JSON code that sets up the routine. Before the JSON, please write CODE. ";
export const routinePrompt = "I want to create an IFTTT routine. Generate a complete IFTTT JSON code that sets up the routine. Before the JSON, please write ROUTINE. You need to use the following instructions to generate the routine. ";
