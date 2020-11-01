'use strict';


$(function () {
    $('button#return').click(_ => {
        history.back();
    });

    $('button#new').click(_ => {
        // DO NOT set global
        // global.cryptoInfo = { salt: null, iv: null, ct: null };
        let pwd = $('#password').val();
        if (pwd == null || pwd == '') {
            platform.showMessage("密码不能为空")
            return;
        }

        if(pwd.length < 6) {
            platform.showMessage("密码过短");
            return;
        }

        global.dataJson = {
            accounts: [],
            bills: [],
            mainCategories: []
        };
        newKeyInternalUnsafe(pwd);
        window.location.href = 'bill_list.html';
    });
});