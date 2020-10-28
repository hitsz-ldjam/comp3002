'use strict';


class CryptoData {
    constructor() {
        /** 
         * @summary Base64 encoded string
         * @type {Array<number>}
         */
        this.salt = null;
        /** 
         * @summary Base64 encoded string
         * @type {string}
         */
        this.iv = null;
        /** 
         * @summary Base64 encoded string
         * @type {string}
         */
        this.ct = null;
    }

    get pbkdfIter() { return 10000; }

    /** AES block cipher with CCM mode */
    get aesParams() { return { v: 1, iter: 14, ks: 256, ts: 128, mode: 'ccm', adata: '', cipher: 'aes' }; }


    /**
     * @param {string} password
     * @return {Array<number>}
     */
    deriveKey(password) {
        const words = 2;
        let salt = this.salt;
        if (!salt || !(salt instanceof Array) || salt.length != words)
            // 64-bit salt
            salt = sjcl.random.randomWords(words, 0);
        let key = sjcl.misc.pbkdf2(password, salt, this.pbkdfIter);
        this.salt = salt;
        return key;
    }


    /**
     * @param {Array<number>} key An array of 8 ints representing a 256-bit key
     * @returns {string} Null if error.
     */
    decrypt(key) {
        let plaintext = null;
        let params = this.aesParams;
        params.iv = this.iv;
        params.ct = this.ct;
        try {
            plaintext = sjcl.json.decrypt(key, JSON.stringify(params));
        }
        catch (e) {
            if (e instanceof sjcl.exception.corrupt)
                platform.logMessage('Wrong password');
            else if (e instanceof sjcl.exception.invalid)
                platform.logError('SJCL invalid error: ' + e.message);
            else
                platform.logWTF(e);
        }
        return plaintext;
    }


    /**
     * @param {Array<number>} key An Array of 8 ints representing a 256-bit key
     * @param {string} plaintext
     * @returns {boolean}
     */
    encrypt(key, plaintext) {
        let params = this.aesParams;
        // 128-bit iv
        params.iv = sjcl.random.randomWords(4, 0);
        try {
            let cipherjson = sjcl.json.encrypt(key, plaintext, params);
            cipherjson = JSON.parse(cipherjson);
            this.iv = cipherjson.iv;
            this.ct = cipherjson.ct;
        }
        catch (e) {
            if (e instanceof sjcl.exception.invalid)
                platform.logError('SJCL invalid error: ' + e.message);
            else
                platform.logWTF(e);
            return false;
        }
        return true;
    }

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
     * @returns {Map<string, string>} Crypto info of content. Possible keys including 
     * 'salt', 'iv', 'ct', 'saltP', 'ivP', 'ctP'
     */
    static validateCryptoFile(content) {
        let info = new Map();
        try {
            const json = JSON.parse(content);
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
}


$(function () {
    sjcl.random.startCollectors();
});
