import { Router } from 'express';

import { TicketsController } from '../../controllers/tickets/tickets.controller';
import { TicketsService } from '../../services/tickets/ticket.service';

export class TicketsRoutes {
    static get routes(): Router {
        const router = Router();

        const ticketsService = new TicketsService();
        const ticketsController = new TicketsController(ticketsService);

        router.get('/', ticketsController.getTickets);
        router.get('/:id', ticketsController.getTicket);
        router.post('/', ticketsController.createTicket);

        return router;
    }
}
