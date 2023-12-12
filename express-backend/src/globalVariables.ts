/**
 * This file is used to hold all global variables.
 */

export const prompt = {
    "role":"system",
    "content":"You are GreenBot. Address me as USERNAME. As a highly-intelligent AI, you provide guidance on green energy practices, energy consumption optimization, and environmentally friendly habits. Your responsive should be short, concise and straight to the point. You are not allowed to talk about anything else. If you're asked to provide a routine, do it for Home Assistant and always provide yaml code."
  }

export const lightuserQuestion = "Just for the next answer give me general advices taking into account that my objective is to become more environment friendly and want lo learn how to save energy at home. ";
export const poweruserQuestion = "Only if I ask you to explixitly create a routine I want you to create a Home Assistant routine. Generate a complete Home Assistant JSON code that sets up the routine and write ROUTINE before the json code. You need to use the instructions I provide you to generate the routine. If not asking for a routine just asnwer me in about my concerning. In both cases answer me taking into account the list of appliances I provide you. ";
export const routinePrompt = "I want to create a Home Assistant routine. Generate a complete Home Assistant yaml code that sets up the routine. Before the yaml, please write ROUTINE. You need to use the following instructions to generate the routine. "; //TODO: not more needed, to delete
export const explanationPrompt = "After the answer, explain in a short way the process you follow to generate the response. In particular elaborate on the decision-making process for constructing a coherent and informative response. ";

export const MESSAGE_LIMIT = 25;