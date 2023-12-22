import { get } from 'env-var';
import 'dotenv/config';

import { Server } from './config/server';
import { AppRoutes } from './router/app.route';

const main = () => {
    const server = new Server({
        port: get('PORT').required().asPortNumber(),
        routes: AppRoutes.routes,
    });

    server.start();
};

(async () => {
    main();
})();
