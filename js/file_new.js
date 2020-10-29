'use strict';


$(function () {
    $('button#return').click(_ => {
        history.back();
    });

    $('button#new').click(_ => {
        // DO NOT set global
        // global.cryptoInfo = { salt: null, iv: null, ct: null };
        global.dataJson = {
            accounts: [],
            bills: [],
            mainCategories: []
        };
        window.location.href = 'bill_list.html';
    });
});
