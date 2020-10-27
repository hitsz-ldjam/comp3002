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

/**
 * @param {number} num 
 * @returns {string}
 */
function generateId(num = 2) {
    return sjcl.codec.hex.fromBits(sjcl.random.randomWords(num, 0));;
}

// todo: validate mainCat & subCat by <select/> itself
/**
 * @param {string} account 
 * @param {number} amount 
 * @param {number} type 
 * @param {number} flag 
 * @param {string} mainCat 
 * @param {string} subCat 
 * @param {Date} time 
 * @param {string} member 
 * @param {string} merchant 
 * @param {string} item 
 */
function addBill(account, amount, type, flag, mainCat, subCat, time, member, merchant, item) {
    if (subCategoryExists(mainCat, subCat)) {
        let bills = global.dataJson.bills;
        
        let data = {
            id: generateId(),
            account: account,
            amount: amount,
            type: type,
            flag: flag,
            mainCategory: mainCat,
            subCategory: subCat,
            time: DateUtils.stringfy(time),
            member: member,
            merchant: merchant,
            item: item
        };

        let i = bills.length;
        while (--i >= 0) {
            let t = DateUtils.parse(bills[i].time);
            if (t <= time) {
                break;
            }
        }

        bills.splice(i + 1, 0, data);
        return true;
    } else {
        return false;
    }
}
