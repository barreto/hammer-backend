import NAMESPACES from '../constants/namespaces';

const getTimesStamp = (): string => new Date().toISOString();

const info = (namespace: NAMESPACES, message: string, object?: any) => {
    const constoleStr = `\n\t[${getTimesStamp()}] [INFO] [${namespace}] ${message}\n`;
    if (object) console.log(constoleStr, object);
    else console.log(constoleStr);
};

const warn = (namespace: NAMESPACES, message: string, object?: any) => {
    const constoleStr = `\n\t[${getTimesStamp()}] [WARN] [${namespace}] ${message}\n`;
    if (object) console.warn(constoleStr, object);
    else console.warn(constoleStr);
};

const error = (namespace: NAMESPACES, message: string, object?: any) => {
    const constoleStr = `\n\t[${getTimesStamp()}] [ERROR] [${namespace}] ${message}\n`;
    if (object) console.error(constoleStr, object);
    else console.error(constoleStr);
};

const debug = (namespace: NAMESPACES, message: string, object?: any) => {
    const constoleStr = `\n\t[${getTimesStamp()}] [DEBUG] [${namespace}] ${message}\n`;
    if (object) console.debug(constoleStr, object);
    else console.debug(constoleStr);
};

export default { info, warn, error, debug };
