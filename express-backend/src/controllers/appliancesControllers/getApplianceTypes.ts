import express, {Request, Response} from 'express';
import { env } from 'process';
import {createClient} from '@supabase/supabase-js'
import "../../types/schema";

const supabaseUrl = env.SUPABASE_PROJECT ?? "default_url";
const supabaseKey = env.SUPABASE_KEY ?? "default_key";

const supabaseClient = createClient(supabaseUrl, supabaseKey);

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

export default getApplianceTypes;