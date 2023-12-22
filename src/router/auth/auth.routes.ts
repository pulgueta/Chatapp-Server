import { Router } from 'express';

import { AuthController } from '../../controllers/auth/auth.controller';
import { AuthService } from '../../services/auth/auth.service';

export class AuthRoutes {
    static get routes(): Router {
        const router = Router();

        const authService = new AuthService();
        const authController = new AuthController(authService);

        router.post('/login', authController.loginController);
        router.post('/register', authController.registerController);

        return router;
    }
}
