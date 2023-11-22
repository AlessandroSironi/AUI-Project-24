import express, {Request, Response} from 'express';
import { env } from 'process';
import {createClient} from '@supabase/supabase-js'
import "../../types/schema";

const supabaseUrl = env.SUPABASE_PROJECT ?? "default_url";
const supabaseKey = env.SUPABASE_KEY ?? "default_key";

const supabaseClient = createClient(supabaseUrl, supabaseKey);

const updateApplianceController = async (req: Request, res: Response) => {
    const id = req.body.id;
    const appliance_type = req.body.appliance_type;
    const appliance_name = req.body.appliance_name;
    const profile_id = req.body.profile_id;

    try {
        const dataToUpdate = {
            appliance_type: appliance_type,
            appliance_name: appliance_name,
            profile_id: profile_id
        };

        const tableName = 'appliance';

        const { data, error } = await supabaseClient
            .from(tableName)
            .update(dataToUpdate)
            .eq('id', id);

        if (error) {
            console.log("Error: ", error);
            throw new Error("Failed to update appliance");
        }

        console.log("Updated appliance: ", dataToUpdate.appliance_name);
        res.send(dataToUpdate);
    } catch (error) {
        console.error(error);
        res.status(500).send("Failed to update appliance");
    }
}

export default updateApplianceController;