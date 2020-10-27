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
            onPattern: function(pattern) {
            console.log(pattern)
            }
        });
    });
});
