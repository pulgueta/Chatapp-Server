import { sign, verify } from 'jsonwebtoken';
import { get } from 'env-var';
import 'dotenv/config';

const jwtSecret = get('JWT_SECRET').required().asString();

export const jwt = {
    generateToken: async (payload: any, expiresIn: string = '8h') => {
        return new Promise((resolve, reject) => {
            sign(
                payload,
                jwtSecret,
                {
                    expiresIn,
                },
                (error, token) => {
                    if (error) return reject(error);

                    resolve(token);
                }
            );
        });
    },
    validateToken: async <T>(token: string): Promise<T | null> => {
        return new Promise((resolve, reject) => {
            verify(token, jwtSecret, (error, decode) => {
                if (error) return reject(error);

                return resolve(decode as T);
            });
        });
    },
};
