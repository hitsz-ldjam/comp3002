'use strict';


$(function () {
    $('button#export').click(_ => {
        // text password only
        const password = $('input#password').val();
        if (!password.length) {
            platform.showMessage('请输入密码');
            return;
        }
        const plaintext = JSON.stringify(global.dataJson);
        const crypto = new CryptoData();
        // new salt will be generated on export
        crypto.salt = CryptoUtils.newSalt();
        const key = crypto.deriveKey(password);
        const flag = crypto.encrypt(key, plaintext);
        if (!flag) {
            platform.showMessage('加密失败');
            return;
        }
        const cryptoInfo = {
            salt: CryptoUtils.bitsToHex(crypto.salt),
            iv: crypto.iv,
            ct: crypto.ct
        };

        // DO NOT set global
        // global.cryptoInfo = cryptoInfo;

        const exportFilename = 'export.json';
        platform.storeAssetFile(exportFilename, JSON.stringify(cryptoInfo));
        platform.onFileExporterResult = function (success) { platform.deleteAssetFile(exportFilename); };
        platform.showFileExporter(exportFilename, 'application/json');
    });


    $('button#return').click(_ => {
        history.back();
    });
});
