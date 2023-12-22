import { Request, Response } from 'express';

import { TicketsService } from '../../services/tickets/ticket.service';
import { ticketSchema } from '../../schemas';

export class TicketsController {
    constructor(private readonly ticketsService: TicketsService) {}

    getTickets = async (_req: Request, res: Response) => {
        const tickets = await this.ticketsService.getTickets();

        if (!tickets) {
            return res.status(404).json([]);
        }

        res.status(200).json(tickets);
    };

    getTicket = async (req: Request, res: Response) => {
        const ticket = await this.ticketsService.getTicket(req.params.id);

        if (!ticket) {
            return res.status(404).send(ticket);
        }

        return res.status(200).send(ticket);
    };

    createTicket = async (req: Request, res: Response) => {
        const parsedBody = ticketSchema.safeParse(req.body);

        if (parsedBody.success) {
            const ticket = await this.ticketsService.createTicket(
                parsedBody.data
            );

            if (!ticket) {
                return res.status(500).send(ticket);
            }

            return res.status(201).send(ticket);
        } else {
            return res.status(400).send({ errors: parsedBody.error.errors });
        }
    };
}
