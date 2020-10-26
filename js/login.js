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

    $('button#import').click(_ => {
        platform.onFileImporterResult = function (data) {
            let cryptoInfo = CryptoUtils.validateJsonFile(data);
            global.cryptoInfo = { salt: cryptoInfo.salt, iv: cryptoInfo.iv, ct: cryptoInfo.ct };
        }

        platform.showFileImporter("application/json");
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

        platform.storeAssetFile("encrypted.json", JSON.stringify(global.cryptoInfo))
        platform.onFileExporterResult = function (success) {
        }
        platform.showFileExporter("encrypted.json", "text/json");
    });

    $('button#login-method-pwd').click(_ => {
        $('.carousel').carousel(0);
    });

    $('button#login-method-pattern').click(_ => {
        $('.carousel').carousel(1);
        //create a pattern instance
        let lock = new PatternLock("#lock", {
            onPattern: function(pattern) {
            console.log(pattern)
            }
        });
    });

    $('button#login-method-finger').click(_ => {
        $('.carousel').carousel(2);
    });
    
});
