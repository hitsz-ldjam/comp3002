'use strict';


$(function () {
    $('button#decrypt').click(_ => {
        if (!(global.cryptoInfo.salt)) {
            platform.showMessage('Please select file');
            return;
        }
        let password = $('input#password-import').val();
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

    $('button#import').click(_ => {
        platform.onFileImporterResult = function (data) {
            let cryptoInfo = CryptoUtils.validateJsonFile(data);
            global.cryptoInfo = { salt: cryptoInfo.salt, iv: cryptoInfo.iv, ct: cryptoInfo.ct };
        }

        platform.showFileImporter("application/json");
    });

    $('button#return').click(_ => {
        window.location.href = 'login.html';
    });
});
