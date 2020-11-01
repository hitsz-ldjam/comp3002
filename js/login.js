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
<<<<<<< HEAD
<<<<<<< HEAD
            const info = CryptoUtils.validateCryptoFile(content);
            if (!info.has('salt')) {
                platform.showMessage('文件格式不合法');
                return false;
            }
            const crypto = new CryptoData();
            crypto.salt = CryptoUtils.hexToBits(info.get('salt'));
            crypto.iv = info.get('iv');
            crypto.ct = info.get('ct');

            // typeof pattern === 'number'    WTF???
            if (isNaN(pattern))
                return false;
            const subpwd = '' + pattern;
            if (subpwd.length < 3) {
                platform.showMessage('图案密码过短');
                return false;
            }

            // should use a more secure method instead
            const pair = JSON.parse(platform.getSubPair());
            const subpwdSaved = pair['subpwd'];
            if (subpwd !== subpwdSaved) {
                platform.showMessage('图案密码错误');
                return false;
            }
            const key = CryptoUtils.hexToBits(pair['key']);

            const plaintext = crypto.decrypt(key);
            if (plaintext === null) {
                platform.showMessage('图案密码错误');
                return false;
            }
            try {
                let dataJson = JSON.parse(plaintext);
                if (!(dataJson['accounts'] && dataJson['bills'] && dataJson['mainCategories']))
                    throw new SyntaxError();
                global.dataJson = dataJson;
                // DO NOT set global
                // global.cryptoInfo = { salt: info.get('salt'), iv: info.get('iv'), ct: info.get('ct') };
            }
            catch (e) {
                platform.showMessage('文件格式不合法');
                if (!(e instanceof SyntaxError))
                    platform.logWTF(e);
                return false;
            }
            window.location.href = './bill_list.html';
            return true;
        }
=======
        });
    });

    $('button#login-method-finger').click(_ => {
        $('.carousel').carousel(2);
>>>>>>> parent of 3236e70... Merge remote-tracking branch 'upstream/master'
=======
        });
    });

    $('button#login-method-finger').click(_ => {
        $('.carousel').carousel(2);
>>>>>>> parent of 3236e70... Merge remote-tracking branch 'upstream/master'
    });
    
});
