import express, {Request, Response} from 'express';
import { env } from 'process';
import {createClient} from '@supabase/supabase-js'
import "../types/schema";

const supabaseUrl = env.SUPABASE_PROJECT ?? "default_url";
const supabaseKey = env.SUPABASE_KEY ?? "default_key";

const supabaseClient = createClient(supabaseUrl, supabaseKey);

const MESSAGE_LIMIT = 25;

const retrieveChat = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabaseClient
      .from('message')
      .select('*')
      .eq('profile_id', req.body.profile_id)
      .limit(MESSAGE_LIMIT)
      .order('timestamp', { ascending: false });

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

export default retrieveChat;