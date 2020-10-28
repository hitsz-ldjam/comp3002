'use strict';


$(function () {
    $('button#export').click(_ => {
        let password = $('input#password-export').val();
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

    $('button#return').click(_ => {
        window.location.href = 'bill_list.html';
    });
});
