import { Request, Response } from 'express';

import { loginSchema, registerSchema } from '../../schemas';
import { AuthService } from '../../services/auth/auth.service';

export class AuthController {
    constructor(private readonly authService: AuthService) {}

    registerController = async (req: Request, res: Response) => {
        console.log('controller', req.body);
        const parsedBody = registerSchema.safeParse(req.body);

        if (parsedBody.success) {
            const user = await this.authService.register(parsedBody.data);

            return res.status(201).send({ user });
        } else {
            res.status(400).send({
                error: parsedBody.error.formErrors.fieldErrors,
            });
        }
    };

    loginController = async (req: Request, res: Response) => {
        const parsedBody = loginSchema.safeParse(req.body);

        if (parsedBody.success) {
            try {
                const user = await this.authService.login(parsedBody.data);

                res.status(200).send(user);
            } catch (error) {
                if (error instanceof Error) {
                    res.status(500).send(error.message);
                }
            }
        } else {
            res.status(400).send({
                error: parsedBody.error.formErrors.fieldErrors,
            });
        }
    };
}
