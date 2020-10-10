'use strict';


$(function () {
    $('button#new').click(_ => {
        global.cryptoInfo = { salt: null, iv: null, ct: null };
        global.dataJson = {
            accounts: [],
            mainCategories: [],
            bills: []
        };
        window.location.href = 'bill_list.html';
    });


    $('input#jsonfile').change(async event => {
        const file = event.target.files[0];
        let result = await file.text();
        let cryptoInfo = CryptoUtils.validateJsonFile(result);
        global.cryptoInfo = { salt: cryptoInfo.salt, iv: cryptoInfo.iv, ct: cryptoInfo.ct };
    });


    $('button#decrypt').click(_ => {
        if (!(global.cryptoInfo.salt)) {
            platform.showMessage('Please select file');
            return;
        }
        let password = $('input#password').val();
        if (!password.length) {
            platform.showMessage('Please input password');
            return;
        }
        let cryptoInfo = new CryptoInfo();
        cryptoInfo.salt = global.cryptoInfo.salt;
        cryptoInfo.iv = global.cryptoInfo.iv;
        cryptoInfo.ct = global.cryptoInfo.ct;
        let plaintext = CryptoUtils.decrypt(password, cryptoInfo);
        // empty string cannot be encrypted
        if (!plaintext) {
            return;
        }
        // todo: handle possible errors
        global.dataJson = JSON.parse(plaintext);
        window.location.href = 'bill_list.html';
    });


    $('button#export').click(_ => {
        let password = $('input#password').val();
        if (!password.length) {
            platform.showMessage('Please input password');
            return;
        }
        let plaintext = JSON.stringify(global.dataJson);
        let cryptoInfo = new CryptoInfo();
        if (!CryptoUtils.encrypt(password, plaintext, cryptoInfo))
            return;
        global.cryptoInfo = { salt: cryptoInfo.salt, iv: cryptoInfo.iv, ct: cryptoInfo.ct };
        platform.exportJsonFile(JSON.stringify(global.cryptoInfo));
    });
});
