'use strict';

// todo: formalize interfaces
function initDropdowns() {
    $('input#account').val('');
    let accountList = $('datalist#account-list');
    accountList.empty();
    for (const account of global.dataJson.accounts)
        accountList.append(`<option value='${account.name}'></option>`);

    $('input#maincat').val('');
    let mainCatList = $('datalist#maincat-list');
    mainCatList.empty();
    for (const mainCategory of global.dataJson.mainCategories)
        mainCatList.append(`<option value='${mainCategory.name}'></option>`);

    $('input#subcat').val('');
    $('datalist#subcat-list').empty();
}


$(function () {
    initDropdowns();

    $('button#submit').click(_ => {
        // todo: check inputs
        // todo: write json
        window.location.href = 'bill_list.html';
    });
});
