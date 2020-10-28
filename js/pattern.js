'use strict';


$(function () {
    $('button#enter').click(_ => {
        $('.carousel').carousel(1);
        let lock = new PatternLock("#lock", {
            onPattern: function(pattern) {
            console.log(pattern)
            }
        });
    });

    $('button#return').click(_ => {
        window.location.href = 'bill_list.html';
    });
});
