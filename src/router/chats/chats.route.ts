import { Router } from 'express';

import { ChatsService } from '../../services/chats/chats.service';
import { ChatsController } from '../../controllers/chats/chats.controller';

export class ChatRoutes {
    static get routes(): Router {
        const router = Router();

        const chatService = new ChatsService();
        const chatController = new ChatsController(chatService);

        router.post('/', chatController.createMessageController);
        router.get('/', chatController.getMessages);

        return router;
    }
}
