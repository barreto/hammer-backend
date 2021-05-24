import * as CryptoJS from 'crypto-js';

function decryptDataSha256(encryptedData: any, key: string) {
    const iv = CryptoJS.enc.Base64.parse('');
    const keySha = CryptoJS.SHA256(key);

    var decrypted = CryptoJS.AES.decrypt(encryptedData, keySha, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
}

export default decryptDataSha256;
