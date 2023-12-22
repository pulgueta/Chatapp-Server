import { NextFunction, Request, Response } from 'express';

import { jwt } from '../../lib/jwt';

type JWTValidation = {
    email: string;
    username: string;
};

export class AuthMiddleware {
    static async validateToken(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const header = req.header('Authorization');

        if (!header) {
            return res
                .status(401)
                .send({ error: 'Unauthorized without authorization header.' });
        }

        if (!header.startsWith('Bearer ')) {
            return res
                .status(400)
                .send({ error: 'Incorrect header provided.' });
        }

        const token = header.split(' ').at(1) ?? '';

        try {
            const payload = await jwt.validateToken<JWTValidation>(token);

            if (!payload) {
                return res.status(401).send({ error: 'Token is invalid.' });
            }

            const user = await prisma?.user.findUnique({
                where: {
                    username: payload.username,
                    email: payload.email,
                },
            });

            if (!user) {
                return res.status(404).send({ error: 'User does not exist.' });
            }

            next();
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).send({ error });
            }
        }
    }
}
