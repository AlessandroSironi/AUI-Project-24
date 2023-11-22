import express, {Request, Response} from 'express';
import { env } from 'process';
import {createClient} from '@supabase/supabase-js'
import "../../types/schema";

const supabaseUrl = env.SUPABASE_PROJECT ?? "default_url";
const supabaseKey = env.SUPABASE_KEY ?? "default_key";

const supabaseClient = createClient(supabaseUrl, supabaseKey);

const insertApplianceController = async (req: Request, res: Response) => {
    const appliance_type = req.body.appliance_type;
    const appliance_name = req.body.appliance_name;
    const profile_id = req.body.profile_id;

    try {
        const dataToInsert = {
            appliance_type: appliance_type,
            appliance_name: appliance_name,
            profile_id: profile_id
        };

        const tableName = 'appliance';

        const { data, error } = await supabaseClient
            .from(tableName)
            .insert(dataToInsert);

        if (error) {
            console.log("Error: ", error);
            throw new Error("Failed to insert appliance");
        }

        console.log("Inserted appliance: ", dataToInsert.appliance_name);
        res.send(dataToInsert);
    } catch (error) {
        console.error(error);
        res.status(500).send("Failed to insert appliance");
    }
}

export default insertApplianceController;