import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

// Load environment variables
dotenv.config();

const port = process.env.PORT || 8000;
const app: Express = express();

app.use(bodyParser.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Hello from the server');
});

import testRouter from './src/routes/testRoute';
app.use('/api/testController', testRouter);

// Ask ChatGPT
import openaiRouter from './src/routes/openaiRoute';
app.use('/api/openaiController', openaiRouter);

// Retrive chat history
import retrieveChatRouter from './src/routes/retrieveChatRoute';
app.use('/api/chat/retrieveChat', retrieveChatRouter);

// Get list of appliance types
import getApplianceTypesRouter from './src/routes/getApplianceTypesRoute';
app.use('/api/appliance/getApplianceTypes', getApplianceTypesRouter);

//Get single appliance data
import getApplianceRouter from './src/routes/getApplianceRoute';
app.use('/api/appliance/getAppliance', getApplianceRouter);

//Upsert appliance data
import upsertApplianceRouter from './src/routes/upsertApplianceRoute';
app.use('/api/appliance/upsertAppliance', upsertApplianceRouter);

app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
});
