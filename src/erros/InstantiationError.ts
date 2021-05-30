import NAMESPACES from '../enums/namespaces';
import getEnumKeyByEnumValue from '../utils/getEnumKeyByEnumValue';

export default class InstatiationError extends Error {
    constructor(namespace: NAMESPACES) {
        const namespaceKey = getEnumKeyByEnumValue(NAMESPACES, namespace);
        const errorMessage = `Instantiation faile - ${namespaceKey}.getInstance() instead of new.\n`;
        super(errorMessage);
    }
}
