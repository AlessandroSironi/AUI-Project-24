import express, {Request, Response} from 'express';
import { env } from 'process';
import {createClient} from '@supabase/supabase-js'
import "../../types/schema";

const supabaseUrl = env.SUPABASE_PROJECT ?? "default_url";
const supabaseKey = env.SUPABASE_KEY ?? "default_key";

const supabaseClient = createClient(supabaseUrl, supabaseKey);

const upsertApplianceController = async (req: Request, res: Response) => {
    const appliance_id = req.body.appliance_id;
    const appliance_type = req.body.appliance_type;
    const appliance_name = req.body.appliance_name;
    const profile_id = req.body.profile_id;

    try {
        const dataToInsert = {
            appliance_id: appliance_id,
            appliance_type: appliance_type,
            appliance_name: appliance_name,
            profile_id: profile_id
        };

        const tableName = 'appliance';

        const { data, error } = await supabaseClient
        .from(tableName)
        .upsert([ dataToInsert ]);
        if (error) console.log("Error: ", error);
        console.log("Upserted appliance: ", dataToInsert.appliance_name);
        res.send(dataToInsert);
    } catch (error) {    
        throw new Error("failed to upsert appliance");
    }
}

export default upsertApplianceController