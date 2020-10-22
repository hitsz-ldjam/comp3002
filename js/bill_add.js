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

    let flagSelect = $('select#flag');
    flagSelect.empty();
    for (const account of global.dataJson.accounts)
        flagSelect.append(`<option value='${account.name}'>${account.name}</option>`);
    flagSelect.hide();
}

function InitTime() {
    let date = new Date();
    $('input#datetime').val(date.toISOString().slice(0,10)+'T'+date.toTimeString().slice(0,8));
}

$(function () {
    initDropdowns();

    InitTime();
    
    $('input#maincat').change(function () {
        let mainCatVal = $(this).val();
        let subCatList = $('datalist#subcat-list');
        $('input#subcat').val('');
        subCatList.empty();
        for (const mainCategory of global.dataJson.mainCategories)
            if (mainCatVal === mainCategory.name) {
                for (const subCategory of mainCategory.subCategories)
                    subCatList.append(`<option value='${subCategory}'></option>`);
                return;
            }
    });

    $('select#type').change(function () {
        let flagSelect = $('select#flag');
        // bug prone: hard coded
        if ($(this).val() === 'transfer')
            flagSelect.show();
        else
            flagSelect.hide();
    });

    $('button#submit').click(_ => {
        // check inputs
        let account = $('input#account').val();
        if (!account) {
            platform.showMessage('Please specify account');
            return;
        }

        let amountStr = $('input#amount').val();
        let amount = +amountStr;
        if (typeof amount !== "number" || !isFinite(amount) || amount < 0) {
            platform.showMessage(`Amount ${amountStr} is invalid`);
            return;
        }

        let mainCat = $('input#maincat').val();
        let subCat = $('input#subcat').val();
        if (!mainCat || !subCat) {
            platform.showMessage('Please select category');
            return;
        }

        let typeStr = $('select#type').val();
        let type = 0;
        let flag = '';
        // bug prone: hard coded string & int
        if (typeStr === 'income')
            type = 1;
        else if (typeStr === 'expense')
            type = 2;
        else {
            type = 2;
            flag = $('select#flag').val();
            // todo: add copy to another account
        }

        let timeStr = $('input#time').val();
        if (!timeStr) {
            platform.showMessage('Please select time');
            return;
        }
        let time = new Date(timeStr);

        let member = $('input#member').val();
        let merchant = $('input#merchant').val();
        let item = $('input#item').val();

        // write json
        addAccount(account);
        if (!mainCategoryExists(mainCat))
            addMainCategory(mainCat);
        addSubCategory(mainCat, subCat);
        addBill(account, amount, type, flag, mainCat, subCat, time, member, merchant, item);

        window.location.href = 'bill_list.html';
    });
});
