import logging from '../config/logging';
import NAMESPACES from '../constants/namespaces';

export const serverRunning = (hostname: string, port: number) => {
    logging.info(NAMESPACES.SERVER, `Server running on ${hostname}:${port}`);
};
