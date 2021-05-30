import logging from '../config/logging';
import NAMESPACES from '../enums/namespaces';

function serverRunning(hostname: string, port: number) {
    logging.info(NAMESPACES.SERVER, `Server running on ${hostname}:${port}`);
}

export default serverRunning;
