import express, { Request, Response } from 'express';
import { env } from 'process';
import { createClient } from '@supabase/supabase-js';
import '../types/schema';
import { z } from 'zod';

const supabaseUrl = env.SUPABASE_PROJECT ?? 'default_url';
const supabaseKey = env.SUPABASE_KEY ?? 'default_key';

const supabaseClient = createClient(supabaseUrl, supabaseKey);

//GET: requires the user unique id and returns the associated username
const getUsername = async (req: Request, res: Response) => {
    const id = req.query.id;
    try {
        const { data, error }: { data: any; error: any } = await supabaseClient.from('profiles').select('username').eq('id', id).single();

        if (error) {
            throw new Error(error.message);
        }
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
}

const getHomeAssistantKey = async (req: Request, res: Response) => {
    const id = req.query.id;
    try {
        const { data, error }: { data: any; error: any } = await supabaseClient.from('profiles').select('homeassistant_key').eq('id', id);

        if (error) {
            throw new Error(error.message);
        }
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
}

const getHomeAssistantUrl = async (req: Request, res: Response) => {
    const id = req.query.id;
    try {
        const { data, error }: { data: any; error: any } = await supabaseClient.from('profiles').select('homeassistant_url').eq('id', id);

        if (error) {
            throw new Error(error.message);
        }
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
}

const updateProfile = async (req: Request, res: Response) => {
    const id = req.params.id;
    const username = req.body.username;
    const key = req.body.key;
    const url = req.body.url;

    const dataToUpdate = {
        username: username,
        homeassistant_key: key,
        url: url
    }
    try {
        const { data, error } = await supabaseClient.from('profiles').update(dataToUpdate).eq('id', id);

        if (error) {
            throw new Error(error.message);
        }
        res.status(200).json(dataToUpdate);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
}




export { getUsername, getHomeAssistantKey, updateProfile, getHomeAssistantUrl};