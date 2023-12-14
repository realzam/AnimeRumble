import dotenv from 'dotenv';

import Server from './Server';

dotenv.config();
const server = new Server();

server.execute();
