import * as CryptoJS from 'crypto-js';

function encryptDataSha256(data: any, key: string) {
    let encryptedString: CryptoJS.lib.CipherParams;
    const iv = CryptoJS.enc.Base64.parse('');
    const keySha = CryptoJS.SHA256(key);
    const dataToEncrypt = typeof data == 'string' ? data : JSON.stringify(data);

    encryptedString = CryptoJS.AES.encrypt(dataToEncrypt, keySha, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    return encryptedString.toString();
}

export default encryptDataSha256;
