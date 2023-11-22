import express, {Request, Response} from 'express';
import { env } from 'process';
import {createClient} from '@supabase/supabase-js'
import "../../types/schema";

const supabaseUrl = env.SUPABASE_PROJECT ?? "default_url";
const supabaseKey = env.SUPABASE_KEY ?? "default_key";

const supabaseClient = createClient(supabaseUrl, supabaseKey);

const insertRoutineController = async (req: Request, res: Response) => {
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

export default insertRoutineController;