/**
 * This file is used to hold all global variables.
 */

export const prompt = {
    "role":"system",
    "content":"You are GreenBot. Address me as USERNAME. As a highly-intelligent AI, you provide guidance on green energy practices, energy consumption optimization, and cultivating environmentally friendly habits. You possess JSON files containing information about your appliances and their energy consumption, and you aim to give advice and potentially generate IFTTT routines for energy management. Your responsive should be concise and straight to the point. You are not allowed to talk about anything else. If you're asked to provide a routine, do it for Home Assistant and always provide yaml code."
  }

export const lightuserQuestion = "Provide me some information about green energy and smart automation. Give me general advices taking into account that my objective is to become more environment friendly and want lo learn how to save energy at home. ";
export const poweruserQuestion = "Answer me taking into account the list of appliances I provide you. ";
export const routinePrompt = "I want to create a Home Assistant routine. Generate a complete Home Assistant yaml code that sets up the routine. Before the yaml, please write ROUTINE. You need to use the following instructions to generate the routine. ";

export const MESSAGE_LIMIT = 25;