import express, {Request, Response} from 'express';
import { env } from 'process';
import {createClient} from '@supabase/supabase-js'
import "../types/schema";

const supabaseUrl = env.SUPABASE_PROJECT ?? "default_url";
const supabaseKey = env.SUPABASE_KEY ?? "default_key";

const supabaseClient = createClient(supabaseUrl, supabaseKey);

const getAppliance = async (req: Request, res: Response) => {
    try {
        const { data, error }: { data: any, error: any } = await supabaseClient
            .from('appliance')
            .select('*')
            .eq('id', req.query.id);

        if (error) {
            throw new Error(error.message);
        }
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
}

const getApplianceTypes = async (req: Request, res: Response) => {
    try {
        const { data, error }: { data: any, error: any } = await supabaseClient
            .from('appliance_type')
            .select('*')
            .order('type', { ascending: true });

        if (error) {
            throw new Error(error.message);
        }
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
}

const insertAppliance = async (req: Request, res: Response) => {
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

const updateAppliance = async (req: Request, res: Response) => {
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

const getApplianceOfUser = async (req: Request, res: Response) => {
    try {
        const { data, error }: { data: any, error: any } = await supabaseClient
            .from('appliance')
            .select('*')
            .eq('profile_id', req.query.profile_id);

        if (error) {
            throw new Error(error.message);
        }
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
    try{
        const { data, error }: { data: any, error: any } = await supabaseClient
            .from('appliance')
            .select('room')
            .eq('profile_id', req.query.profile_id)
        
        
        const uniqueValues = [...new Set(data.map((item: { room: any; }) => item.room))];
        console.log(uniqueValues)
        if (error) {
            throw new Error(error.message);
        }
        res.status(200).json(uniqueValues);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
}

export {getAppliance, getApplianceTypes, insertAppliance, updateAppliance, getApplianceOfUser};