'use strict';


$(function () {
    $('button#decrypt').click(_ => {
        if (!(global.cryptoInfo.salt)) {
            platform.showMessage('请选择文件');
            return;
        }
        let password = $('input#password').val();
        if (!password.length) {
            platform.showMessage('请输入密码');
            return;
        }
        let crypto = new CryptoData();
        crypto.salt = CryptoUtils.hexToBits(global.cryptoInfo.salt);
        crypto.iv = global.cryptoInfo.iv;
        crypto.ct = global.cryptoInfo.ct;
        let key = crypto.deriveKey(password);
        let plaintext = crypto.decrypt(key);
        if (plaintext === null) {
            platform.showMessage('密码错误');
            return;
        }
        // todo: handle possible errors
        global.dataJson = JSON.parse(plaintext);
        window.location.href = 'bill_list.html';
    });

    $('button#import').click(_ => {
        platform.onFileImporterResult = function (data) {
            let info = CryptoUtils.validateCryptoFile(data);
            if (info.has('salt')) {
                global.cryptoInfo = {
                    salt: info.get('salt'),
                    iv: info.get('iv'),
                    ct: info.get('ct')
                };
                // if (info.has('saltP')) {
                //     global.cryptoInfo['saltP'] = info.get('saltP');
                //     global.cryptoInfo['ivP'] = info.get('ivP');
                //     global.cryptoInfo['ctP'] = info.get('ctP');
                // }
            }
            // todo: implement this. Clear saved subpwd pair
            platform.clearSubPair();
        }

        platform.showFileImporter("application/json");
    });

    $('button#return').click(_ => {
        window.location.href = 'login.html';
    });
});
