import { prisma } from '../../database';
import { Message } from '../../schemas';

export class ChatsService {
    constructor() {}

    public async createMessage(message: Message) {
        const msg = await prisma.message.create({
            data: {
                from: message.role,
                text: message.message,
                chatId: message.id,
            },
        });

        return msg;
    }

    public async getMessages(id: string) {
        const messages = await prisma.message.findMany({
            where: {
                chatId: id,
            },
        });

        console.log(messages);

        return messages;
    }
}
