import { prisma } from '../../database';
import { Message } from '../../schemas';

export class ChatsService {
    constructor() {}

    public async createMessage(message: Message) {
        return message;
    }

    public async getMessages() {}
}
