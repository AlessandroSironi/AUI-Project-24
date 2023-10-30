import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const port = process.env.PORT || 8000;
const app: Express = express();

app.get('/', (req: Request, res: Response) => {
    res.send('Hello from the server');
});

import testRouter from './src/routes/testRoute';
app.use('/api/testRoute', testRouter);

app.listen(port, () => {
    console.log(`now listening on port ${port}`);
});
