import express, { Request, Response } from 'express';
import { env } from 'process';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';
import '../types/schema';

const supabaseUrl = env.SUPABASE_PROJECT ?? 'default_url';
const supabaseKey = env.SUPABASE_KEY ?? 'default_key';

const supabaseClient = createClient(supabaseUrl, supabaseKey);

//POST: insert a new routine, requires profile_id, routine_name, json(can be null) and returns the inserted data
const insertRoutine = async (req: Request, res: Response) => {
    const validation = z.object({
        profile_id: z.string(),
        routine_name: z.string(),
        json: z.string().nullable(),
    });
    const profile_id = req.query.profile_id;
    const routine_name = req.body.routine_name;
    const json = req.body.json;

    const dataToInsert = {
        profile_id: profile_id,
        routine_name: routine_name,
        json: json,
    };

    try {
        validation.parse(dataToInsert);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
        return;
    }

    try {
        const tableName = 'routine';

        const { data, error } = await supabaseClient.from(tableName).insert(dataToInsert);
        console.log('Inserted routine: ', dataToInsert.routine_name);
        res.send(dataToInsert);
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to insert routine');
    }
};

//POST: update routine for the id specified, you can pass either a routine_name or a json or both, returns the updated data
const updateRoutine = async (req: Request, res: Response) => {
    const id = Number(req.body.id);
    //const profile_id = req.query.profile_id
    const routine_name = req.body.routine_name;
    const json = req.body.json;

    const validationID = z.number();
    try {
        validationID.parse(id);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
        return;
    }

    const validation = z.object({
        routine_name: z.string(),
        json: z.string().nullable(),
    });

    const dataToUpdate = {
        routine_name: routine_name,
        json: json,
    };

    try {
        validation.parse(dataToUpdate);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
        return;
    }

    try {
        const tableName = 'routine';

        const { data, error } = await supabaseClient.from(tableName).update(dataToUpdate).eq('id', id);

        if (error) {
            console.log('Error: ', error);
            throw new Error('Failed to update routine');
        }

        console.log('Updated routine: ', dataToUpdate.routine_name);
        res.send(dataToUpdate);
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to update routine');
    }
};

//POST: delete routine for the id specified
const deleteRoutine = async (req: Request, res: Response) => {
    const id = Number(req.body.id);

    const validation = z.number();
    try {
        validation.parse(id);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
        return;
    }
    const tableName = 'routine';
    try {
        const { data, error } = await supabaseClient.from(tableName).delete().eq('id', id);

        if (error) {
            console.log('Error: ', error);
            throw new Error('Failed to delete routine');
        }

        console.log('Deleted routine');
        res.send(data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to delete routine');
    }
};

//this is just a test: this api is not required
const getRoutine = async (req: Request, res: Response) => {
    const id = req.query.id;
    try {
        const { data, error }: { data: any; error: any } = await supabaseClient.from("routine").select("json").eq('id', id);
        res.status(200).json(data);
        let automation = {};
        automation = data[0].json;
        console.log(automation);
        const variableType = typeof automation;
        console.log(variableType);
    }
    catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
}

export { insertRoutine, updateRoutine, deleteRoutine, getRoutine };
