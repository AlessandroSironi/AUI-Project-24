import { Request, Response } from 'express';
import { env } from 'process';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';

const supabaseUrl = env.SUPABASE_PROJECT ?? 'default_url';
const supabaseKey = env.SUPABASE_KEY ?? 'default_key';

const supabaseClient = createClient(supabaseUrl, supabaseKey);

const checkHomeAssistant = async (req: Request, res: Response) => {
    //Retrieve token and url from supabase
    const id = req.query.id;
    const { data, error }: { data: any; error: any } = await supabaseClient.from('profiles').select('homeassistant_key, homeassistant_url').eq('id', id).single();
    const token = data.homeassistant_key;
    const url = data.homeassistant_url;
    
    // bearer token must be passed to authorize user in home-assistant APIs
    let headers = new Headers({ Authorization: `Bearer ${token}` });
    try {
        console.log(env.HOMEASSISTANT_URL + '/api/');
        const apiResponse = await fetch(url + '/api/', {
            headers: headers,
        });
        const apiResponseJson = await apiResponse.json();
        res.send({ 'message from home assistant: ': apiResponseJson });
    } catch (err) {
        console.log(err);
        res.status(500).send('Something went wrong');
    }
};

const createAutomation = async (req: Request, res: Response) => {
    const profile_id = req.body.profile_id;
    const idRoutine = req.body.routine_id;

    let automation = '';
    try {
        const { data, error }: { data: any; error: any } = await supabaseClient.from('routine').select('json').eq('id', idRoutine).single();
        automation = data.json ?? 'ZIOPERA';
    } catch (error) {
        console.log(error);
        res.status(500).send('Something went wrong');
    }
    /* const { data, error }: { data: any; error: any } = await supabaseClient.from('routine').select('json').eq('id', idRoutine);
    const automation = data[0].json; */
    //Parse with zod and validate that automation is a JSON object
    const automationSchema = z.object({
        alias: z.string(),
        trigger: z.array(
            z.object({
                platform: z.string(),
                at: z.string(),
            })
        ),
        action: z.array(
            z.object({
                service: z.string(),
                entity_id: z.string(),
            })
        ),
    });

    try {
        automationSchema.parse(automation);
    } catch (error) {
        console.log(error);
        res.status(400).send('Invalid automation object');
    }
    // we need to generate a unique identifier for the routine
    const id = uuidv4();

    let token = '';
    let url = '';
    try {
        const { data, error }: { data: any; error: any } = await supabaseClient.from('profiles').select('homeassistant_key, homeassistant_url').eq('id', profile_id).single();
        token = data.homeassistant_key;
        url = data.homeassistant_url;
    } catch (error) {
        console.log(error);
        res.status(500).send('Something went wrong');
    }
    let headers = new Headers({ Authorization: `Bearer ${token}` });

    try {
        // fetch POST the endpoint with the new ID in the params and the automation object as body
        const apiResponse = await fetch(url + `/api/config/automation/config/${id}`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(automation),
        });
        const apiResponseJson = await apiResponse.json();
        console.log('response is:', apiResponseJson);
    } catch (err) {
        console.log(err);
        res.status(500).send('Something went wrong');
    }

    /* const dataToInsert = {
        profile_id: profile_id,
        routine_name: automation.alias,
        json: automation,
    };

    // Validate dataToInsert with zod
    const validation = z.object({
        profile_id: z.string(),
        routine_name: z.string(),
        json: z.string().nullable(),
    });

    try {
        validation.parse(dataToInsert);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
        return;
    } */

    // We already save the routine in the openaiController, so we don't need to save it here
    /* try {
        const tableName = 'routine';
        const { data, error } = await supabaseClient.from(tableName).insert(dataToInsert);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    } */
};

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0,
            v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

export { checkHomeAssistant, createAutomation };
