'use strict';

class AuthParams {
    constructor() {
        this.salt = null;
        this.cipherjson = null;
    }

    get iter() { return 1000; }

    // AES block cipher with CCM mode
    get aesParams() { return { v: 1, iter: this.iter, ks: 256, ts: 128, mode: 'ccm', adata: '', cipher: 'aes' }; }
}

// todo: make Singlton
/** @type {AuthParams} */
var authParamsInstance = null;


$(function () {
    sjcl.random.startCollectors();
    authParamsInstance = new AuthParams();


    $('#input-file').change(async event => {
        authParamsInstance = new AuthParams();
        $('#input-password').val('');
        $('#textarea-maindata').val('');
        // todo: alert unsaved files

        const file = event.target.files[0];
        // todo: filter file by file.type & file.size
        // todo: r/w as binary with FileReader

        var result = await file.text();
        try {
            const json = JSON.parse(result);
            if (json['salt'] === undefined || json['iv'] === undefined || json['ct'] === undefined)
                throw new SyntaxError();
            authParamsInstance.salt = sjcl.codec.hex.toBits(json.salt);
            authParamsInstance.cipherjson = {
                iv: json.iv,
                ct: json.ct
            };
        }
        catch (error) {
            if (error instanceof SyntaxError)
                LogError('Syntax error in file');
            else
                LogError('Unexpected error: ' + error);
        }
    });


    // $('#input-password').keyup(event => { if (event.key === 'Enter') { } });

    $('#button-decrypt').click(_ => {
        if (authParamsInstance === null || authParamsInstance.cipherjson === null) {
            ShowMessage('Please select file');
            return;
        }
        var password = $('#input-password').val();
        if (password.length === 0) {
            ShowMessage('Please input password');
            return;
        }
        var salt = authParamsInstance.salt;
        var key = sjcl.misc.pbkdf2(password, salt, authParamsInstance.iter);

        // decrypting
        var plaintext = '';
        try {
            // bug in SJCL convenience.js line 106
            // plaintext = sjcl.json.decrypt(key, JSON.stringify(authParamsInstance.cipherjson), authParamsInstance.aesParams);
            var cipherjson = authParamsInstance.aesParams;
            cipherjson['iv'] = authParamsInstance.cipherjson.iv;
            cipherjson['ct'] = authParamsInstance.cipherjson.ct;
            plaintext = sjcl.json.decrypt(key, JSON.stringify(cipherjson));
        }
        catch (error) {
            if (error instanceof sjcl.exception.corrupt)
                ShowMessage('Wrong password');
            else if (error instanceof sjcl.exception.invalid)
                LogError('SJCL invalid error: ' + error.message);
            else
                LogError('Unexpected error: ' + error);
        }
        $('#textarea-maindata').val(plaintext);
    });


    $('#button-saveencrypted').click(_ => {
        var password = $('#input-password').val();
        if (password.length === 0) {
            ShowMessage('Please input password');
            return;
        }
        var plaintext = $('#textarea-maindata').val();
        if (plaintext.length === 0) {
            ShowMessage('Please input plaintext');
            return;
        }
        // $('#input-password').val('');
        // $('#textarea-maindata').val('');

        // 16-bit salt
        var salt = sjcl.random.randomWords(2, 0);
        // PBKDF2-HMAC-SHA256
        var key = sjcl.misc.pbkdf2(password, salt, authParamsInstance.iter);
        var params = authParamsInstance.aesParams;
        params['iv'] = sjcl.random.randomWords(4, 0);
        var cipherjson = '';
        try {
            cipherjson = sjcl.json.encrypt(key, plaintext, params);
            authParamsInstance.cipherjson = JSON.parse(cipherjson);
            authParamsInstance.salt = sjcl.codec.hex.fromBits(salt);
            // generate blob
            var outputJSON = {
                salt: authParamsInstance.salt,
                iv: authParamsInstance.cipherjson.iv,
                ct: authParamsInstance.cipherjson.ct
            };
            var blob = new Blob([JSON.stringify(outputJSON)], { type: 'application/json' });
            const downloadURL = URL.createObjectURL(blob);
            var dummyA = document.createElement('a');
            dummyA.href = downloadURL;
            dummyA.download = 'encrypted.json'
            dummyA.click();
        }
        catch (error) {
            if (error instanceof sjcl.exception.invalid)
                LogError('SJCL invalid error: ' + error.message);
            else
                LogError('Unexpected error: ' + error);
        }
    });
});



// todo: use custom UI
function ShowMessage(message) {
    alert(message);
}

function LogMessage(message) {
    console.log(message);
}

function LogError(error) {
    console.error(error);
}
