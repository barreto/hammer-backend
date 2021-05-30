import * as crypto from 'crypto-js';

export default function encrypt(value: string, key: string) {
    return crypto.HmacSHA256(value, key).toString(crypto.enc.Hex);
}
