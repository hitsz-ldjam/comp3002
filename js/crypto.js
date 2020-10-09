'use strict';

class CryptoInfo {
    constructor() {
        this.salt = null;
        this.iv = null;
        this.ct = null;
    }

    get iter() { return 10000; }

    /** AES block cipher with CCM mode */
    get aesParams() { return { v: 1, iter: this.iter, ks: 256, ts: 128, mode: 'ccm', adata: '', cipher: 'aes' }; }
}


class CryptoUtils {
    /**
     * @param {string} content File content.
     * @returns {CryptoInfo} Crypto info of content, null if error.
     */
    static validateJsonFile(content) {
        let cryptoInfo = null;
        try {
            const json = JSON.parse(content);
            if (!(json.salt && json.iv && json.ct))
                throw new SyntaxError();
            cryptoInfo = new CryptoInfo();
            cryptoInfo.salt = sjcl.codec.hex.toBits(json.salt);
            cryptoInfo.iv = json.iv;
            cryptoInfo.ct = json.ct;
        }
        catch (error) {
            if (error instanceof SyntaxError)
                platform.logError('Syntax error in file');
            else
                platform.logWTF(error);
        }
        return cryptoInfo;
    }


    // todo: pass key instead of raw password
    // todo: redesign this
    /**
     * @param {string} password
     * @param {CryptoInfo} cryptoInfo
     * @returns {string}
     */
    static decrypt(password, cryptoInfo) {
        let salt = cryptoInfo.salt;
        // PBKDF2-HMAC-SHA256
        let key = sjcl.misc.pbkdf2(password, salt, cryptoInfo.iter);
        let plaintext = null;
        let params = cryptoInfo.aesParams;
        params.iv = cryptoInfo.iv;
        params.ct = cryptoInfo.ct;
        try {
            plaintext = sjcl.json.decrypt(key, JSON.stringify(params));
        }
        catch (error) {
            if (error instanceof sjcl.exception.corrupt)
                platform.showMessage('Wrong password');
            else if (error instanceof sjcl.exception.invalid)
                platform.logError('SJCL invalid error: ' + error.message);
            else
                platform.logWTF(error);
        }
        return plaintext;
    }


    // todo: pass key instead of raw password
    /**
     * @param {string} password
     * @param {string} plaintext
     * @param {CryptoInfo} cryptoInfo Modified inplace
     * @returns {boolean}
     */
    static encrypt(password, plaintext, cryptoInfo) {
        // 16-bit salt
        let salt = sjcl.random.randomWords(2, 0);
        let key = sjcl.misc.pbkdf2(password, salt, cryptoInfo.iter);
        let params = cryptoInfo.aesParams;
        params.iv = sjcl.random.randomWords(4, 0);
        try {
            let cipherJson = sjcl.json.encrypt(key, plaintext, params);
            cipherJson = JSON.parse(cipherJson);
            cryptoInfo.ct = cipherJson.ct;
            cryptoInfo.iv = cipherJson.iv;
            cryptoInfo.salt = sjcl.codec.hex.fromBits(salt);
        }
        catch (error) {
            if (error instanceof sjcl.exception.invalid)
                platform.logError('SJCL invalid error: ' + error.message);
            else
                platform.logWTF(error);
            return false;
        }
        return true;
    }
}


$(function () {
    sjcl.random.startCollectors();
});
