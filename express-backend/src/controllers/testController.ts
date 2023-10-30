import { Request, Response } from 'express';

const testController = (req: Request, res: Response) => {
    res.send('Server up and running');
};

export default testController;
