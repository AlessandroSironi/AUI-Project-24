import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';

// Load environment variables
dotenv.config();

const port = process.env.PORT || 8000;
const app: Express = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
    res.send('Hello from the server');
});
/* 
import testRouter from './src/routes/testRoute';
app.use('/api/testController', testRouter); */

// Ask ChatGPT
import openai from './src/routes/openaiRoute';
app.use('/api/openai', openai);

// Retrive chat history
import chatRouter from './src/routes/chatRoute';
app.use('/api/chat', chatRouter);

import applianceRouter from './src/routes/appliancesRoute';
app.use('/api/appliance', applianceRouter);

import routineRouter from './src/routes/routinesRoute';
app.use('/api/routine', routineRouter);

app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
});
