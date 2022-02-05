import express from 'express';
import cors from 'cors';
import { Config } from './utils/config';
import {router} from './routes/index';


class App {
    public app: express.Application;

    constructor () {
        this.app = express();
        this.app.use(cors());
        this.app.use(express.json({limit: '10kb'}));
        this.app.use(express.urlencoded({extended: true}));
        this.app.use('/api/v1/', router);
        console.log();
        
    }

    public listen () {
        const PORT = Config.PORT;
        const server = this.app.listen(PORT);
        server.on('error', (error: any) => {
            if(error.syscall !== 'listen') {
                throw error;
            }
            const port = PORT
            const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
            switch(error.code) {
                case 'EACCES':
                    console.error(bind + ' requires elevated privileges');
                    process.exit(1);
                    break;
                case 'EDDRINUSE':
                    console.error(bind + ' is already in use');
                    process.exit(1);
                    break;
                default:
                    throw error;
            }
        });
        return server;
    }
}

export {App}