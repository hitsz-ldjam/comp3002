'use strict';


$(function () {
    $('button#return').click(_ => {
        window.location.href = 'login.html';
    });

    $('button#new').click(_ => {
        window.location.href = 'bill_list.html';
    });
});
