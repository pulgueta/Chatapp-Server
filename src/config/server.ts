import express, { Router, json } from 'express';

interface Options {
    port: number;

    public_path?: string;
}

export class Server {
    public readonly app = express();
    private serverListener?: any;
    private readonly port: number;

    constructor(options: Options) {
        const { port } = options;
        this.port = port;

        this.configure();
    }

    private configure() {
        this.app.use(json());
    }

    public setRoutes(router: Router) {
        this.app.use(router);
    }

    async start() {
        this.serverListener = this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }

    public close() {
        this.serverListener?.close();
    }
}
