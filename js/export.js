'use strict';


$(function () {
    $('button#export').click(_ => {
        // text password only
        let password = $('input#password-export').val();
        if (!password.length) {
            platform.showMessage('请选择文件');
            return;
        }
        let plaintext = JSON.stringify(global.dataJson);
        let crypto = new CryptoData();
        // new salt will be generated on export
        crypto.salt = CryptoUtils.newSalt();
        let key = crypto.deriveKey(password);
        if (!crypto.encrypt(key, plaintext)) {
            // todo: handle errors
            return;
        }
        global.cryptoInfo = {
            salt: CryptoUtils.bitsToHex(crypto.salt),
            iv: crypto.iv,
            ct: crypto.ct
        };

        platform.storeAssetFile("encrypted.json", JSON.stringify(global.cryptoInfo))
        platform.onFileExporterResult = function (success) {}
        platform.showFileExporter("encrypted.json", "text/json");
    });

    $('button#return').click(_ => {
        window.location.href = 'bill_list.html';
    });
});
