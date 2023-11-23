import express, {Request, Response} from 'express';
import { env } from 'process';
import {createClient} from '@supabase/supabase-js'
import "../types/schema";

const supabaseUrl = env.SUPABASE_PROJECT ?? "default_url";
const supabaseKey = env.SUPABASE_KEY ?? "default_key";

const supabaseClient = createClient(supabaseUrl, supabaseKey);

const MESSAGE_LIMIT = 25; //maybe 10 are enough

const retrieveChat = async (req: Request, res: Response) => {
  const profile_id = req.body.profile_id;
  try {
    const { data, error } = await supabaseClient
      .from('message')
      .select('*')
      .eq('profile_id', profile_id)
      .order('timestamp', { ascending: true })
      .limit(MESSAGE_LIMIT);
    if (data) {
      const retrievedChat = data; //TODO: make json for samu
      res.send(retrievedChat);
    } else {
      throw new Error('Data is null');
    }
  } catch (error) {
    console.error("retrieveChatHistory error: ", error);
    throw error;
  }
}
export { retrieveChat };