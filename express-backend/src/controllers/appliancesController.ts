import express, { Request, Response } from 'express';
import { env } from 'process';
import { createClient } from '@supabase/supabase-js';
import '../types/schema';
import { z } from 'zod';

const supabaseUrl = env.SUPABASE_PROJECT ?? 'default_url';
const supabaseKey = env.SUPABASE_KEY ?? 'default_key';

const supabaseClient = createClient(supabaseUrl, supabaseKey);

//GET: requires the appliance unique id and returns the associated row: id, profile_id, appliance_name, appliance_type and room
const getAppliance = async (req: Request, res: Response) => {
    const validation = z.number();
    const id = Number(req.query.id);
    try {
        validation.parse(id);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
        return;
    }
    try {
        const { data, error }: { data: any; error: any } = await supabaseClient.from('appliance').select('*,appliance_type(type)').eq('id', id).single();
        data['appliance_type'] = data['appliance_type']['type'];

        if (error) {
            throw new Error(error.message);
        }
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

//GET: returns all the appliance types: it's an array of jsons with the following fields: id, type
const getApplianceTypes = async (req: Request, res: Response) => {
    try {
        const { data, error }: { data: any; error: any } = await supabaseClient.from('appliance_type').select('*').order('type', { ascending: true });

        if (error) {
            throw new Error(error.message);
        }
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

//DELETE: requires the appliance unique id and deletes the associated row
const deleteAppliance = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const validation = z.number();
    try {
        validation.parse(id);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
        return;
    }
    try {
        const { data, error }: { data: any; error: any } = await supabaseClient.from('appliance').delete().eq('id', id);
        if (error) {
            throw new Error(error.message);
        }
        console.log('Deleted appliance');
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

//POST: insert a new appliance, requires appliance_type, appliance_name, profile_id and returns the inserted data
const insertAppliance = async (req: Request, res: Response) => {
    const appliance_type = req.body.appliance_type;
    const appliance_name = req.body.appliance_name;
    const profile_id = req.body.profile_id;
    const room = req.body.room;

    const validation = z.object({
        appliance_type: z.string(),
        appliance_name: z.string(),
        profile_id: z.string(),
        room: z.string(),
    });

    const dataToInsert = {
        appliance_type: appliance_type,
        appliance_name: appliance_name,
        profile_id: profile_id,
        room: room,
    };

    let appliance_type_num;
    try {
        appliance_type_num = await supabaseClient.from('appliance_type').select('id').eq('type', appliance_type).single();
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
    if (appliance_type_num) dataToInsert.appliance_type = appliance_type_num.data?.id;

    try {
        validation.parse(dataToInsert);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
        return;
    }

    try {
        const tableName = 'appliance';

        const { data, error } = await supabaseClient.from(tableName).insert(dataToInsert);

        if (error) {
            console.log('Error: ', error);
            throw new Error('Failed to insert appliance');
        }

        console.log('Inserted appliance: ', dataToInsert.appliance_name);
        res.status(200).json(dataToInsert);
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to insert appliance');
    }
};

//PUT: update appliance for the id specified, you can pass either a appliance_type, appliance_name or both, returns the updated data
const updateAppliance = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const appliance_type = req.body.appliance_type;
    const appliance_name = req.body.appliance_name;
    const room = req.body.room;
    const avg_consumption = req.body.avg_consumption;
    const brand = req.body.brand;

    const validationid = z.number();
    try {
        validationid.parse(id);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
        return;
    }
    const validationToUpdate = z.object({
        appliance_type: z.string().optional(),
        appliance_name: z.string().optional(),
        room: z.string().optional(),
        avg_consumption: z.number().optional(),
        brand: z.string().optional(),
    });

    const dataToUpdate = {
        appliance_type: appliance_type,
        appliance_name: appliance_name,
        room: room,
        avg_consumption: avg_consumption,
        brand: brand,
    };

    try {
        validationToUpdate.parse(dataToUpdate);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
        return;
    }

    let appliance_type_num;
    try {
        appliance_type_num = await supabaseClient.from('appliance_type').select('id').eq('type', appliance_type).single();
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
    if (appliance_type_num) dataToUpdate.appliance_type = appliance_type_num.data?.id;

    try {
        const tableName = 'appliance';

        const { data, error } = await supabaseClient.from(tableName).update(dataToUpdate).eq('id', id);

        if (error) {
            console.log('Error: ', error);
            throw new Error('Failed to update appliance');
        }

        console.log('Updated appliance: ', dataToUpdate.appliance_name);
        res.status(200).json(dataToUpdate);
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to update appliance');
    }
};

//GET: requires the profile_id and returns all the appliances associated with that profile
const getApplianceOfUser = async (req: Request, res: Response) => {
    let appliancesOfUser: any[] = [];
    let roomsOfUser: any[] = [];

    const profile_id = req.query.profile_id;
    const validation = z.string();
    try {
        validation.parse(profile_id);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
        return;
    }
    try {
        const { data, error }: { data: any; error: any } = await supabaseClient.from('appliance').select('*, appliance_type(type)').eq('profile_id', profile_id);
        for (const item of data) {
            item['appliance_type'] = item['appliance_type']['type'];
        }
        appliancesOfUser = data;

        if (error) {
            throw new Error(error.message);
        }
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
    try {
        const { data, error }: { data: any; error: any } = await supabaseClient.from('appliance').select('room').eq('profile_id', req.query.profile_id);

        roomsOfUser = [...new Set(data.map((item: { room: any }) => item.room))];
        console.log(roomsOfUser);
        if (error) {
            throw new Error(error.message);
        }
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }

    const combinedJSON = {
        appliances: appliancesOfUser,
        rooms: roomsOfUser,
    };
    res.status(200).json(combinedJSON);
};

export { getAppliance, getApplianceTypes, insertAppliance, updateAppliance, getApplianceOfUser, deleteAppliance };
