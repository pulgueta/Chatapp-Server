import { prisma } from '../../database';
import { Ticket } from '../../schemas';

export class TicketsService {
    constructor() {}

    public async getTickets() {
        const tickets = await prisma.ticket.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });

        if (!tickets) {
            return [];
        }

        return tickets;
    }

    public async getTicket(id: string) {
        try {
            const ticket = await prisma.ticket.findFirst({
                where: {
                    id,
                },
            });

            if (!ticket) {
                return { error: 'No ticket found' };
            }

            return ticket;
        } catch (error) {
            console.log(error);
        }
    }

    public async createTicket(ticketData: Ticket) {
        try {
            const ticket = await prisma.ticket.create({
                data: {
                    ticketTitle: ticketData.title,
                    ticketDescription: ticketData.description,
                    ticketSeverity: ticketData.severity,
                    submittedBy: ticketData.username,
                },
            });

            return ticket;
        } catch (error) {
            return {
                error,
            };
        }
    }
}
