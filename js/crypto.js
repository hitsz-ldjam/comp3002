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
<<<<<<< HEAD
<<<<<<< HEAD

    /**
     * @param {string} password
     * @return {boolean}
     */
    verifyPassword(password) {
        let salt = this.salt;
        if (!salt || !(salt instanceof Array) || salt.length != 2)
            return false;
        let key = sjcl.misc.pbkdf2(password, salt, this.pbkdfIter);
        return this.verifyKey(key);
    }

    /**
     * @param {Array<number>} key An Array of 8 ints representing a 256-bit key
     * @returns {boolean}
     */
    verifyKey(key) {
        let plaintext = null;
        let params = this.aesParams;
        params.iv = this.iv;
        params.ct = this.ct;
        try {
            plaintext = sjcl.json.decrypt(key, JSON.stringify(params));
        }
        catch (e) { }
        return plaintext !== null;
    }
}


class CryptoUtils {
    /** @returns {Array<number>} */
    static random(bitNum) { return sjcl.random.randomWords(Math.ceil(bitNum / 32), 0); }

    /** @returns {Array<number>} */
    static newSalt() { return this.random(64); }

    /**
     * @param {string} hex
     * @returns {Array<number>}
     */
    static hexToBits(hex) { return sjcl.codec.hex.toBits(hex); }

    /**
     * @param {Array<number>} bits
     * @returns {string}
     */
    static bitsToHex(bits) { return sjcl.codec.hex.fromBits(bits); }

    /**
     * @param {string} content File content.
     * @returns {Map<string, string>} Crypto info of content. Possible keys including 'salt', 'iv', 'ct'.
     */
    static validateCryptoFile(content) {
        let info = new Map();
        try {
            let json = JSON.parse(content);

            if (!(json.salt && json.iv && json.ct))
                throw new SyntaxError();
            info.set('salt', json.salt);
            info.set('iv', json.iv);
            info.set('ct', json.ct);
            // if (json.saltP && json.ivP && json.ctP) {
            //     info.set('saltP', json.saltP);
            //     info.set('ivP', json.ivP);
            //     info.set('ctP', json.ctP);
            // }
        }
        catch (e) {
            if (e instanceof SyntaxError)
                platform.logError('Syntax error in file');
            else
                platform.logWTF(e);
        }
        return info;
    }
=======
>>>>>>> parent of 3236e70... Merge remote-tracking branch 'upstream/master'
=======
>>>>>>> parent of 3236e70... Merge remote-tracking branch 'upstream/master'
}


$(function () {
    sjcl.random.startCollectors();
});
