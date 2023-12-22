import Express, { Router, json, static as serveStatic } from 'express';
import cors from 'cors';

interface Options {
    port: number;
    routes: Router;
}

export class Server {
    private app = Express();
    private readonly port: number;

    private readonly routes: Router;

    constructor(options: Options) {
        const { port, routes } = options;
        this.port = port;
        this.routes = routes;
    }

    async start() {
        this.app.disable('x-powered-by');
        this.app.use(json());
        this.app.use(cors());
        this.app.use(this.routes);

        this.app.listen(this.port, () => {
            console.log(`[*] Server running on port ${this.port}`);
        });
    }
}
