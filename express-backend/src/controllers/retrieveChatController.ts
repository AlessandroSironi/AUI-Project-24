import express, {Request, Response} from 'express';
import { env } from 'process';
import {createClient} from '@supabase/supabase-js'
import "../types/schema";

const supabaseUrl = env.SUPABASE_PROJECT ?? "default_url";
const supabaseKey = env.SUPABASE_KEY ?? "default_key";

const supabaseClient = createClient(supabaseUrl, supabaseKey);

const MESSAGE_LIMIT = 25;

const prompt = {
  "role":"system",
  "content":"You are GreenBot. The user's name is Siro. As a highly-intelligent AI, you provide guidance on green energy practices, energy consumption optimization, and cultivating environmentally friendly habits. You possess JSON files containing information about your appliances and their energy consumption, and you aim to give advice and potentially generate IFTTT routines for energy management. Your responsive should be concise and straight to the point. You are not allowed to talk about anything else."
}

const retrieveChatController = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabaseClient
      .from('message')
      .select('*')
      .eq('profile_id', req.body.profile_id)
      .order('timestamp', { ascending: false })
      .limit(MESSAGE_LIMIT);

    if (data) {
      data.unshift(prompt);
      res.send(data);
    } else {
      throw new Error('Data is null');
    }
  } catch (error) {
    console.error("retrieveChatHistory error: ", error);
    throw error;
  }
}

export default retrieveChatController;