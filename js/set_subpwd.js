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

// todo
function saveToInternal() {
    let flag = platform.hasSubPair();
    if (!flag) {
        // todo: same as export (?) but with set path
        return;
    }

    // todo: implement this. Should use a more secure method instead
    let [_, key] = platform.getSubPair();

    let plaintext = JSON.stringify(global.dataJson);
    let crypto = new CryptoData();
    // keep salt, can be optimised
    // crypto.salt = CryptoUtils.hexToBits(global.cryptoInfo.salt);
    if (!crypto.encrypt(key, plaintext)) {
        // todo: handle errors
        return;
    }
    // global.cryptoInfo = {
    //     // salt: CryptoUtils.bitsToHex(crypto.salt),
    //     iv: crypto.iv,
    //     ct: crypto.ct
    // };
    // todo: write file
}
