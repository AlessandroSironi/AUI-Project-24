import express, {Request, Response} from 'express';
import { env } from 'process';
import {createClient} from '@supabase/supabase-js'
import "../types/schema";

const supabaseUrl = env.SUPABASE_PROJECT ?? "default_url";
const supabaseKey = env.SUPABASE_KEY ?? "default_key";

const supabaseClient = createClient(supabaseUrl, supabaseKey);

//POST: insert a new routine, requires profile_id, routine_name, json(can be null) and returns the inserted data
const insertRoutine = async (req: Request, res: Response) => {
    const profile_id = req.body.profile_id
    const routine_name = req.body.routine_name;
    const json = req.body.json;

    try {
        const dataToInsert = {
            profile_id: profile_id,
            routine_name: routine_name,
            json: json
        };

        const tableName = 'routine';

        const { data, error } = await supabaseClient
            .from(tableName)
            .insert(dataToInsert);

        if (error) {
            console.log("Error: ", error);
            throw new Error("Failed to insert routine");
        }

        console.log("Inserted routine: ", dataToInsert.routine_name);
        res.send(dataToInsert);
    } catch (error) {
        console.error(error);
        res.status(500).send("Failed to insert routine");
    }
}

//POST: update routine for the id specified, you can pass either a routine_name or a json or both, returns the updated data
const updateRoutine = async (req: Request, res: Response) => {
    const id = req.body.id;
    //const profile_id = req.body.profile_id
    const routine_name = req.body.routine_name;
    const json = req.body.json;

    try {
        const dataToUpdate = {
            //profile_id: profile_id,
            routine_name: routine_name,
            json: json
        };

        const tableName = 'routine';

        const { data, error } = await supabaseClient
            .from(tableName)
            .update(dataToUpdate)
            .eq('id', id);

        if (error) {
            console.log("Error: ", error);
            throw new Error("Failed to update routine");
        }

        console.log("Updated routine: ", dataToUpdate.routine_name);
        res.send(dataToUpdate);
    } catch (error) {
        console.error(error);
        res.status(500).send("Failed to update routine");
    }
}

//POST: delete routine for the id specified
const deleteRoutine = async (req: Request, res: Response) => {
    const id = req.body.id;
    const tableName = 'routine';
    try{
        const { data, error } = await supabaseClient
            .from(tableName)
            .delete()
            .eq('id', id);

        if (error) {
            console.log("Error: ", error);
            throw new Error("Failed to delete routine");
        }

        console.log("Deleted routine");
        res.send(data);
    } catch (error) {
        console.error(error);
        res.status(500).send("Failed to delete routine");
    }
}

export {insertRoutine, updateRoutine, deleteRoutine};