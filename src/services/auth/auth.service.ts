import { response } from 'express';
import { hash, verify } from 'argon2';

import { Login, Register } from '../../schemas';
import { prisma } from '../../database';
import { jwt } from '../../lib/jwt';

export class AuthService {
    constructor() {}

    public async register(userData: Register) {
        console.log('service', userData);
        const emailIsTaken = await prisma.user.findUnique({
            where: {
                email: userData.email,
            },
        });

        if (emailIsTaken) {
            return response
                .status(400)
                .send({ error: 'Email is already taken.' });
        }

        const userIsTaken = await prisma.user.findUnique({
            where: {
                username: userData.username,
            },
        });

        if (userIsTaken) {
            return response
                .status(400)
                .send({ error: 'Username is already taken.' });
        }

        try {
            const user = await prisma.user.create({
                data: {
                    username: userData.username,
                    email: userData.email,
                    password: await hash(userData.password),
                },
                select: {
                    id: true,
                    username: true,
                },
            });

            return user;
        } catch (error) {
            if (error instanceof Error) {
                return response.status(500).send(error.message);
            }
        }
    }

    public async login(userData: Login) {
        const user = await prisma.user.findUnique({
            where: {
                username: userData.username,
            },
        });

        if (!user) {
            return response.status(404).send({ error: 'User does not exist.' });
        }

        const token = await jwt.generateToken({
            email: user.email,
            username: user.username,
        });

        if (!token) {
            return response
                .status(500)
                .send({ error: 'Internal server error with JWT, try again.' });
        }

        if (user && (await verify(user.password, userData.password))) {
            return JSON.stringify({
                token,
                role: user.role,
            });
        } else {
            return response.status(401).send({ error: 'Invalid credentials.' });
        }
    }
}
