/**
 * Auth middleware to handle the protected backend routes
 * must be applied to routes as I did in index.ts
 */

import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // get JWT token from the header
        const token = req.header('Authorization')?.split(' ')[1];
        // get supabase JWT secret from .env file
        const supabaseSecret: string = `${process.env.SUPABASE_JWT_SECRET}`;

        // check if token is present
        if (token) {
            // decrypt token (raise error if it is not valid)
            const decryptedToken = jwt.verify(token, supabaseSecret) as JwtPayload;
            // get the uid from the token
            const uidFromToken = decryptedToken.sub;
            // get the uid from the request body
            const uidFromBody = req.body.uid;

            // if the uids are equals we exit from the middleware and access the function's controller
            if (uidFromBody === uidFromToken) {
                next();
            } else if (uidFromBody === undefined) {
                // if the uid was not sent throw an error
                console.log('no uid in body');
                throw new Error();
            } else {
                // if the check fails an error is thrown (will return wrong token)
                console.log('wrong token user association');
                throw new Error();
            }
        } else {
            res.status(401).send({ msg: 'No token, auth denied!' });
        }
    } catch (err) {
        return res.status(400).send({ error: 'Invalid token, auth denied!' });
    }
};

export default auth;
