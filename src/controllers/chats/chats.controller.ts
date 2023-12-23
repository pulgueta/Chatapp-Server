import { Request, Response } from 'express';

import { ChatsService } from '../../services/chats/chats.service';
import { messageSchema } from '../../schemas';

export class ChatsController {
    constructor(private readonly chatService: ChatsService) {}

    createMessageController = async (req: Request, res: Response) => {
        const parsedBody = messageSchema.safeParse(req.body);
        if (parsedBody.success) {
            const message = await this.chatService.createMessage(
                parsedBody.data
            );

            return res.status(200).send(message);
        }
    };

    getMessages = async (req: Request, res: Response) => {
        const messages = await this.chatService.getMessages(req.params.id);
        return res.send(messages);
    };
}
