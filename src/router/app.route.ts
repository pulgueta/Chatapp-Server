import { Router } from 'express';

import { AuthRoutes } from '../router/auth/auth.routes';
import { TicketsRoutes } from './tickets/tickets.route';
import { AuthMiddleware } from '../middlewares/auth/auth.middleware';
import { ChatRoutes } from './chats/chats.route';

export class AppRoutes {
    static get routes(): Router {
        const router = Router();

        router.use('/api/auth', AuthRoutes.routes);
        router.use(
            '/api/tickets',
            [AuthMiddleware.validateToken],
            TicketsRoutes.routes
        );
        router.use(
            '/api/chats',
            [AuthMiddleware.validateToken],
            ChatRoutes.routes
        );

        return router;
    }
}
