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

import openaiRouter from './src/routes/openaiRoute';
app.use('/api/openaiController', openaiRouter);

app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
});
