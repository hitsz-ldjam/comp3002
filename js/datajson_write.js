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

/**
 * @param {string} id 
 * @returns {boolean}
 */
function billExists(id) {
    // todo use id-index map
    for (let i = 0; i < global.dataJson.bills.length; ++i) {
        if (global.dataJson.bills[i].id === id) {
            return true;
        }
    }
    return false;
}

/**
 * @param {string} id 
 * @returns null if there is no matching bill
 */
function getBill(id) {
    for (let i = 0; i < global.dataJson.bills.length; ++i) {
        if (global.dataJson.bills[i].id === id) {
            return global.dataJson.bills[i];
        }
    }
    return null;
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
 * @param {string} id
 */
function addBill(account, amount, type, flag, mainCat, subCat, time, member, merchant, item, id = null) {
    if (subCategoryExists(mainCat, subCat)) {
        let bills = global.dataJson.bills;
        let newId = id ? id : generateId();
        let data = {
            id: newId,
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

/**
 * @param {string} id
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
 * 
 * @returns {boolean}
 */
function replaceBill(id, account, amount, type, flag, mainCat, subCat, time, member, merchant, item) {
    let bills = global.dataJson.bills;
    for (let i = 0; i < bills.length; ++i) {
        if (bills[i].id === id) {
            if(bills[i].time === time) {
                bills[i].account = account;
                bills[i].amount = amount;
                bills[i].type = type;
                bills[i].flag = flag;
                bills[i].mainCat = mainCat;
                bills[i].subCat = subCat;
                bills[i].member = member;
                bills[i].merchant = merchant;
                bills[i].item = item;
            }else {
                // Time has changed, the index of the bill may change
                // Remove the old one and add a new one
                bills.splice(i, 1);
                addBill(account, amount, type, flag, mainCat, subCat, time, member, merchant, item, id);
            }

            return true;
        }
    }

    return false;
}

/**
 * @param {string} id
 * @returns {boolean}
 */
function removeBill(id) {
    for (let i = 0; i < global.dataJson.bills.length; ++i) {
        if (global.dataJson.bills[i].id === id) {
            global.dataJson.bills.splice(i, 1);
            return true;
        }
    }
    return false;
}