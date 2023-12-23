import { createServer } from 'http';

import { get } from 'env-var';
import 'dotenv/config';

import { Server } from './config/server';
import { AppRoutes } from './router/app.route';
import { WssService } from './services/socket/socket.service';

const PORT = get('PORT').required().asPortNumber();

const main = () => {
    const server = new Server({
        port: get('PORT').required().asPortNumber(),
    });

    const http = createServer(server.app);
    WssService.initWss({ server: http });

    server.setRoutes(AppRoutes.routes);

    http.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

(async () => {
    main();
})();
