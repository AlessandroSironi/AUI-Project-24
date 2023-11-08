import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import OpenAI from 'openai';

// Load environment variables
dotenv.config();

const port = process.env.PORT || 8000;
const app: Express = express();

app.get('/', (req: Request, res: Response) => {
    res.send('Hello from the server');
});

import testRouter from './src/routes/openaiRoute';
app.use('/api/openaiRoute', testRouter);

app.listen(port, () => {
    console.log(`now listening on port ${port}`);
});
