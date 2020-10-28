'use strict';


$(function () {
    $('button#new').click(_ => {
        global.cryptoInfo = { salt: null, iv: null, ct: null };
        global.dataJson = {
            accounts: [],
            mainCategories: [],
            bills: []
        };
        window.location.href = 'new.html';
    });

    $('button#import').click(_ => {
        window.location.href = 'import.html';
    });

    $('button#login').click(_ => {
        //to do
        window.location.href = 'bill_list.html';
    });

    $('button#login-method-pwd').click(_ => {
        $('.carousel').carousel(0);
    });

    $('button#login-method-pattern').click(_ => {
        $('.carousel').carousel(1);
        let lock = new PatternLock("#lock", {
            onPattern: function (pattern) {
                // typeof pattern === 'number'    WTF???
                platform.logMessage(pattern);
                if (isNaN(pattern))
                    return;
                let subpwd = '' + pattern;
                if (subpwd.length < 3) {
                    platform.logMessage('图案密码过短');
                    return;
                }
                platform.logMessage(subpwd);

                let password = $('input#password').val();
                if (!password.length) {
                    platform.logMessage('请输入文本密码');
                    return;
                }

                // todo
            }
        });
    });
});


// todo: inline the following functions

/**
 * @param {CryptoData} data
 * @param {string} password
 * @param {string} subpwd
 */
function setSubPassword(data, password, subpwd) {
    let valid = data.verifyPassword(password);
    if (!valid) {
        platform.showMessage('主文本密码错误');
        return false;
    }
    let key = data.deriveKey(password);
    // todo: implement this. Save 2 str to secret stoarge.
    platform.saveSubPair(subpwd, key);
    return true;
}

/**
 * @param {CryptoData} data
 * @param {string} subpwd
 */
function decryptWithSubPassword(data, subpwd) {
    // todo: implement this. Check wether subpwd is set.
    let flag = platform.hasSubPair();
    if (!flag) {
        platform.showMessage('未设置图案密码');
        return null;
    }
    // todo: implement this. Should use a more secure method instead
    let [subpwdSaved, key] = platform.getSubPair();
    if (subpwd !== subpwdSaved) {
        platform.showMessage('图案密码错误');
        return null;
    }
    let plaintext = data.decrypt(key);
    if (plaintext === null) {
        platform.showMessage('图案密码错误');
        return null;
    }
    return plaintext;
}

function loadFromInternal() {
    // todo: same as import (?) but with set path
}

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
    global.cryptoInfo = {
        // salt: CryptoUtils.bitsToHex(crypto.salt),
        iv: crypto.iv,
        ct: crypto.ct
    };
    // todo: write file
}
