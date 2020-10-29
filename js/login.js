'use strict';


$(function () {
    $('button#new').click(_ => {
        window.location.href = './file_new.html';
    });


    $('button#import').click(_ => {
        window.location.href = './file_import.html';
    });


    $('button#login').click(_ => {
        const password = $('input#password').val();
        if (!password.length) {
            platform.showMessage('请输入密码');
            return;
        }
        // check internal backup file
        const encryptedFilename = 'encrypted.json';
        const content = platform.loadAssetFile(encryptedFilename);
        if (content === null) {
            platform.showMessage('无内部备份');
            return;
        }
        const info = CryptoUtils.validateCryptoFile(content);
        if (!info.has('salt')) {
            platform.showMessage('文件格式不合法');
            return;
        }
        const crypto = new CryptoData();
        crypto.salt = CryptoUtils.hexToBits(info.get('salt'));
        crypto.iv = info.get('iv');
        crypto.ct = info.get('ct');
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


    $('button#login-method-pwd').click(_ => {
        $('.carousel').carousel(0);
    });


    if (platform.hasSubPair()) {
        $('button#login-method-pattern').show();
    }
    else {
        $('button#login-method-pattern').hide();
    }

    $('button#login-method-pattern').click(_ => {
        $('.carousel').carousel(1);
    });


    const lock = new PatternLock(document.getElementById('lock'), {
        onPattern: function (pattern) {
            // todo: check these BEFORE showing the panel
            if (!platform.hasSubPair()) {
                platform.showMessage('未设置图案密码');
                return false;
            }
            // check internal backup file
            const content = platform.loadAssetFile('encrypted.json');
            if (content === null) {
                platform.showMessage('无内部备份');
                return false;
            }
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
            const pair = platform.getSubPair();
            const subpwdSaved = pair['subpwd'];
            if (subpwd !== subpwdSaved) {
                platform.showMessage('图案密码错误');
                return false;
            }
            const key = pair['pair'];

            const plaintext = data.decrypt(key);
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
    });
});
