'use strict';


function resetDataJson() {
    global.dataJson = {
        setting: "",
        mainCategories: [],
        accounts: [],
        bills: []
    };
}

function accountExists(name) {
    return global.dataJson.accounts.findIndex(element => {
        return element.name === name;
    }) !== -1;
}

function mainCategoryExists(name) {
    return global.dataJson.mainCategories.findIndex(element => {
        return element.name === name;
    }) !== -1;
}

function subCategoryExists(main, sub) {
    let mainCat = global.dataJson.mainCategories;
    let idx = mainCat.findIndex(element => {
        return element.name === main;
    });

    return idx != -1 && global.dataJson.mainCategories[idx].subCategories.includes(sub);
}

/**
 * @param {string} name Account name
 */
function addAccount(name) {
    if (!accountExists(name)) {
        global.dataJson.accounts.push({
            name: name
        });
    }
    return true;
}


/**
 * @param {string} name Category name
 */
function addMainCategory(name) {
    if (!mainCategoryExists(name)) {
        global.dataJson.mainCategories.push({
            name: name,
            subCategories: []
        });
    }
    return true;
}


/**
 * @param {string} main Main category name to be added to
 * @param {string} sub Sub category name
 * @param {boolean} allowNewMain True to allow creating new main category
 */
function addSubCategory(main, sub, allowNewMain = false) {
    let mainCat = global.dataJson.mainCategories;
    let idx = mainCat.findIndex(element => {
        return element.name === main;
    });

    if (idx != -1) {
        let subCat = mainCat[idx].subCategories;
        if (!subCat.includes(sub)) {
            subCat.push(sub);
        }
        return true;
    } else {
        if (allowNewMain) {
            mainCat.push({
                name: main,
                subCategories: [sub]
            });
            return true;
        } else {
            return false;
        }
    }
}


// todo: validate mainCat & subCat by <select/> itself
function addBill(account, amount, type, flag, mainCat, subCat, time, member, merchant, item) {
    if (subCategoryExists(mainCat, subCat)) {
        global.dataJson.bills.push({
            account: account,
            amount: amount,
            type: type,
            flag: flag,
            mainCategory: mainCat,
            subCategory: subCat,
            time: time,
            member: member,
            merchant: merchant,
            item: item
        });
        return true;
    } else {
        return false;
    }
}
