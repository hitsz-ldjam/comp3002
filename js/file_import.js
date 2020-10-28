'use strict';


$(function () {
    let cryptoInfo = new Map();

    $('button#import').click(_ => {
        platform.onFileImporterResult = function (data) {
            cryptoInfo = CryptoUtils.validateCryptoFile(data);
            if (!cryptoInfo.has('salt'))
                platform.showMessage('文件格式不合法');
        }

        platform.showFileImporter('application/json');
    });


    $('button#decrypt').click(_ => {
        if (!cryptoInfo.has('salt')) {
            platform.showMessage('请选择文件');
            return;
        }
        // text password
        const password = $('input#password').val();
        if (!password.length) {
            platform.showMessage('请输入密码');
            return;
        }
        const crypto = new CryptoData();
        crypto.salt = CryptoUtils.hexToBits(cryptoInfo.get('salt'));
        crypto.iv = cryptoInfo.get('iv');
        crypto.ct = cryptoInfo.get('ct');
        const key = crypto.deriveKey(password);
        const plaintext = crypto.decrypt(key);
        if (plaintext === null) {
            platform.showMessage('密码错误');
            return;
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
            return;
        }
        window.location.href = './bill_list.html';
    });


    $('button#new').click(_ => {
        window.location.href = './file_new.html';
    });


    if (platform.listAssetFiles().includes('encrypted.json'))
        $('button#login').show();
    else
        $('button#login').hide();

    $('button#login').click(_ => {
        window.location.href = './login.html';
    });
});
