'use strict';


$(function () {
    $('button#new').click(_ => {
        g_CryptoInfo = new CryptoInfo();
        g_DataJson = { 
            accounts: [],
            mainCategories: []
        };
    });


    $('input#jsonfile').change(async event => {
        const file = event.target.files[0];
        let result = await file.text();
        g_CryptoInfo = CryptoUtils.validateJsonFile(result);
    });


    $('button#decrypt').click(_ => {
        if (!(g_CryptoInfo instanceof CryptoInfo)) {
            platform.showMessage('Please select file');
            return;
        }
        let password = $('input#password').val();
        if (!password.length) {
            platform.showMessage('Please input password');
            return;
        }
        let plaintext = CryptoUtils.decrypt(password, g_CryptoInfo);
        // empty string cannot be encrypted
        if (plaintext === '') {
            return;
        }
        // todo: handle possible errors
        g_DataJson = JSON.parse(plaintext);
        // todo
        window.location.href = 'EditBills.html';
    });


    $('button#export').click(_ => {
        let password = $('input#password').val();
        if (!password.length) {
            platform.showMessage('Please input password');
            return;
        }
        let plaintext = JSON.stringify(g_DataJson);
        if (!encrypt(password, plaintext, g_CryptoInfo))
            return;
        let exportJson = {
            salt: g_CryptoInfo.salt,
            iv: g_CryptoInfo.iv,
            ct: g_CryptoInfo.ct
        };
        platform.exportJsonFile(JSON.stringify(exportJson));
    });
});
