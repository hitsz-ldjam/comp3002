'use strict';


function resetDataJson() {
    g_DataJson = {
        accounts: [],
        mainCategories: []
    };
}


/**
 * @param {string} name Account name
 */
function addAccount(name) {
    g_DataJson.accounts.push({
        name: name,
        bills: []
    });
}


/**
 * @param {string} name Category name
 */
function addMainCategory(name) {
    for (const mainCat of g_DataJson.mainCategories)
        if (mainCat.name === name)
            return false;
    g_DataJson.mainCategories.push({
        name: name,
        subCategories: []
    });
    return true;
}


/**
 * @param {string} main Main category name to be added to
 * @param {string} sub Sub category name
 * @param {boolean} allowNewMain True to allow creating new main category
 */
function addSubCategory(main, sub, allowNewMain = false) {
    for (const mainCat of g_DataJson.mainCategories)
        if (mainCat.name === main) {
            mainCat.subCategories.push(sub);
            return true;
        }
    if (!allowNewMain)
        return false;
    g_DataJson.mainCategories.push({
        name: main,
        subCategories: [sub]
    });
    return true;
}


// todo: validate mainCat & subCat by <select/> itself
function addBill(account, amount, type, mainCat, subCat, time, member) {
    for (const accountObj of accounts)
        if (accountObj.name === account) {
            let bill = {
                amount: amount,
                type: type,
                mainCategory: mainCat,
                subCategory: subCat,
                time: time,
                member: member
            };
            account.bills.push(bill);
            return true;
        }
    return false;
}
