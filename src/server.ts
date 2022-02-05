require('dotenv').config(); // Sets up dotenv as soon as our application starts

import {App} from './app';
import { logger as Logger } from './utils/logger';
const app = new App();
const server = app.listen();
server.on('listening', () => {
    const addr: any = server.address();
    console.log(addr.port);
    const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    Logger.info(`Listening on ${bind}`);
});

process.on('SIGINT', () => {
    server.close((error) => {
        Logger.info('www - sigint - server closed');
        if(error){
            Logger.error(error.message);
            process.exit(1);
        } else {
            Logger.info('www - sigint - process exited');
            process.exit(0);
        }
    });
})

process.on('unhandledRejection', (reason, p) => {
    server.close(() => {
        Logger.error('Unhandled Rejection at: Promise', p, 'reason:', reason);
        process.exit(1);
    });
    Logger.error('Unhandled Rejection at: Promise ', p, reason);
})