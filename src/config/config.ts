import * as dotenv from 'dotenv';

dotenv.config();

const SERVER_PORT: number = parseInt(process.env.PORT as string, 10);
const SERVER_HOSTNAME: string = process.env.HOSTNAME as string;

const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT
};

const config = { server: SERVER };

export default config;
