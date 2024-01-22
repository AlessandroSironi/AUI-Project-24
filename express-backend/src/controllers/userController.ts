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
    const id = req.query.profile_id;
    const validation = z.string();
    try {
        validation.parse(id);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
        return;
    }

    try {
        const { data, error } = await supabaseClient.from('profiles').select('username').eq('id', id).single();

        if (error) {
            throw new Error(error.message);
        }
        res.status(200).json(data.username);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

//GET: return Home Assistant Key given unique user's id
const getHomeAssistantKey = async (req: Request, res: Response) => {
    const id = req.query.profile_id;
    const validation = z.string();
    try {
        validation.parse(id);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
        return;
    }

    try {
        const { data, error } = await supabaseClient.from('profiles').select('homeassistant_key').eq('id', id).single();

        if (error) {
            throw new Error(error.message);
        }
        res.status(200).json(data.homeassistant_key);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

//GET: return Home Assistant url given unique user's id
const getHomeAssistantUrl = async (req: Request, res: Response) => {
    const id = req.query.profile_id;
    const validation = z.string();
    try {
        validation.parse(id);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
        return;
    }

    try {
        const { data, error } = await supabaseClient.from('profiles').select('homeassistant_url').eq('id', id).single();

        if (error) {
            throw new Error(error.message);
        }
        res.status(200).json(data.homeassistant_url);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

//PUT :update profile data, non specified parameters stay unchanged
const updateProfile = async (req: Request, res: Response) => {
    const id = req.params.profile_id;
    const username = req.body.username;
    const key = req.body.key;
    const url = req.body.url;

    console.log(typeof id);
    console.log(typeof username);
    console.log(typeof key);
    console.log(typeof url);

    const validationData = z.object({
        username: z.string(),
        homeassistant_key: z.string(),
        homeassistant_url: z.string(),
    });

    const dataToUpdate = {
        username: username,
        homeassistant_key: key,
        homeassistant_url: url,
    };

    try {
        validationData.parse(dataToUpdate);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
        return;
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
};

export { getUsername, getHomeAssistantKey, updateProfile, getHomeAssistantUrl };
