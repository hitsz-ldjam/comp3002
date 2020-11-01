'use strict';


$(function () {
    let mainKey = null;


    $('button#cancel').click(_ => {
        history.back();
    });


    $('button#validate').click(_ => {
        mainKey = null;

        // todo: check backup BEFORE showing this page
        const content = platform.loadAssetFile('encrypted.json');
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

        const password = $('input#password').val();
        if (!password.length) {
            platform.showMessage('请输入密码');
            return;
        }
        const valid = crypto.verifyPassword(password);
        if (!valid) {
            platform.showMessage('主文本密码错误');
            return;
        }

        mainKey = CryptoUtils.bitsToHex(crypto.deriveKey(password));
        $('.carousel').carousel(1);
    });


    const lock = new PatternLock(document.getElementById('lock'), { onPattern: function () { this.success() } });


    $('button#confirm').click(_ => {
        /** @type {number} */
        const pattern = lock.getPattern();
        if (isNaN(pattern) || !mainKey) {
            lock.error();
            return;
        }
        const subpwd = '' + pattern;
        if (subpwd.length < 3) {
            lock.error();
            platform.showMessage('图案密码过短');
            return;
        }
        platform.saveSubPair(subpwd, mainKey);
        history.back();
    });
});


// todo: inline the following functions

function deleteInternal() {
    platform.deleteAssetFile('encrypted.json');
}

/**
 * @summary Call ONLY when creating new file
 */
function newKeyInternalUnsafe(raw_pwd) {
    const crypto = new CryptoData();
    crypto.salt = CryptoUtils.newSalt();
    const key = crypto.deriveKey(raw_pwd);

    global._demoUnsafeMagic_.salt = CryptoUtils.bitsToHex(crypto.salt);
    global._demoUnsafeMagic_.key = CryptoUtils.bitsToHex(key);

    platform.clearSubPair();
    platform.saveSubPair('0', global._demoUnsafeMagic_.key);

    const plaintext = JSON.stringify(global.dataJson);
    if (!crypto.encrypt(key, plaintext)) {
        platform.showMessage('加密失败');
        return;
    }
    const cryptoInfo = {
        salt: CryptoUtils.bitsToHex(crypto.salt),
        iv: crypto.iv,
        ct: crypto.ct
    };
    const backupFilename = 'encrypted.json';
    platform.storeAssetFile(backupFilename, JSON.stringify(cryptoInfo));
}

/**
 * @summary OnStop callback
 */
function backupInternalUnsafe() {
    const flag = platform.hasSubPair();
    if (!flag) {
        platform.showMessage('平台不支持内部备份');
        return;
    }

    const pair = JSON.parse(platform.getSubPair());
    const key = CryptoUtils.hexToBits(pair['key']);
    const plaintext = JSON.stringify(global.dataJson);

    const backupFilename = 'encrypted.json';
    const content = platform.loadAssetFile(backupFilename);
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
    if (!crypto.encrypt(key, plaintext)) {
        platform.showMessage('加密失败');
        return;
    }
    const cryptoInfo = {
        salt: CryptoUtils.bitsToHex(crypto.salt),
        iv: crypto.iv,
        ct: crypto.ct
    };
    platform.storeAssetFile(backupFilename, JSON.stringify(cryptoInfo));
}

platform.onStop = function () { backupInternalUnsafe() }