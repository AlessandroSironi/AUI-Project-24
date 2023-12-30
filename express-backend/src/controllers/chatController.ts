import express, { Request, Response } from 'express';
import { env } from 'process';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';
import { Database } from '../types/schema';
import { MESSAGE_LIMIT } from '../globalVariables';
import { extractJSONName, extractJSONString } from '../helpers/parserModule';

const supabaseUrl = env.SUPABASE_PROJECT ?? 'default_url';
const supabaseKey = env.SUPABASE_KEY ?? 'default_key';

const supabaseClient = createClient(supabaseUrl, supabaseKey);

//GET: requires profile_id and returns all the chat history with LIMIT = 25 ordered by timestamp,
// note that each message has a flag is_chatgpt to distinguish between messages sent by the user and messages sent by the chatbot
// plus a is_routing flag is set to TRUE if the message contains a code for a json routine
const retrieveChat = async (req: Request, res: Response) => {
    const profile_id = req.query.profile_id;
    const validation = z.string();
    try {
        validation.parse(profile_id);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
        return;
    }
    try {
        const { data, error } = await supabaseClient.from('message').select('*').eq('profile_id', profile_id).order('timestamp', { ascending: false }).limit(MESSAGE_LIMIT);
        if (data) {
            data.forEach((message) => {
                if (message.is_routine == true) {
                    const routineName = extractJSONName(message.message);
                    const routineJSON = extractJSONString(message.message);

                    message['routine'] = {
                        routineName: routineName,
                        routineJSON: routineJSON,
                    };
                }
            });
            const retrievedChat = data.reverse(); //TODO: make json for samu
            res.send(retrievedChat);
        } else {
            throw new Error('Data is null: ' + error);
        }
    } catch (error) {
        throw new Error('Error in retrieveChat: ' + error);
    }
};

export { retrieveChat };
