import * as dotenv from 'dotenv';

dotenv.config();

const SERVER_PORT: number = parseInt(process.env.PORT as string, 10);
const SERVER_HOSTNAME: string = process.env.HOSTNAME as string;

const MONGO_OPTIONS = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    socketTimeoutMS: 30000,
    keepAlive: true,
    poolSize: 50,
    autoIndex: false,
    retryWrites: false
};

const MONGO_HOST = process.env.MONGO_HOST as string;
const MONGO_USERNAME = process.env.MONGO_USERNAME as string;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD as string;

const MONGO = {
    host: MONGO_HOST,
    username: MONGO_USERNAME,
    password: MONGO_PASSWORD,
    options: MONGO_OPTIONS,
    url: `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}`
};

const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT
};

const config = { mongo: MONGO, server: SERVER };

export default config;
