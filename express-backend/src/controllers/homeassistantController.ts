import { Request, Response } from 'express';
import { env } from 'process';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';
import { cleanAutomationJSON } from '../helpers/parserModule';

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
    const profile_id = req.query.profile_id;
    const idRoutine: number = req.body.routine_id;

    // we need to generate a unique identifier for the routine
    const id = uuidv4();

    let automation = '';

    try {
        const { data, error } = await supabaseClient.from('routine').select('json').eq('id', idRoutine).single();
        automation = data?.json;
    } catch (error) {
        console.log(error);
        res.status(500).send('Failed to create automation.');
        return;
    }

    let token = '';
    let url = '';

    try {
        const { data: data, error } = await supabaseClient.from('profiles').select('homeassistant_key, homeassistant_url').eq('id', profile_id).single();
        const token = await data?.homeassistant_key;
        const url = await data?.homeassistant_url;

        let headers = new Headers({ Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' });

        try {
            // fetch POST the endpoint with the new ID in the params and the automation object as body

            console.log(automation);
            automation = cleanAutomationJSON(automation);
            console.log(automation);
            const bodyAutomation = JSON.parse(automation);
            console.log(bodyAutomation);

            const apiResponse = await fetch(url + `/api/config/automation/config/${id}`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(bodyAutomation),
            });
            console.log('JSON Sent: \n' + bodyAutomation);
            const apiResponseJson = await apiResponse.json();
            console.log('response is:', apiResponseJson);
            res.send({ 'message from home assistant: ': apiResponseJson });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: `Something went wrong with the request: ${err}` });
            return;
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Failed to retrieve Token and URL of Home Assistant.');
        return;
    }
};

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0,
            v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

export { checkHomeAssistant, createAutomation };
