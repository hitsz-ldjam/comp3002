/**
 * READ HERE FIRST!!
 * 
 * If a key in bills is not defined, for example:
 *"bills": [
        {
            "account": "现金",
            "amount": 20,
            "type": 0, // 收入/支出
            "flag": "", // 另一个账户的名字
            "mainCategory": "食物",
            "subCategory": "早餐",
            "time": "2020-xx-yy",
            "member": "我",
            "merchant": "",
            "item": ""
        }
    ]
    member, merchant,item   are not defined, those function for them will return as following:

    undefined: [
    {
      account: '现金',
      amount: 20,
      type: 0,
      flag: '',
      ...
    }]

 */


var choices = {
    day: 0,
    month: 1,
    year: 2,
    quarter: 3
};
/**
 * You will not use this function.
 * @param {*} date 
 * @param {*} choice 
 */
function getDate(date, choice) {
    var curYear = date.getFullYear();
    var curMonth = date.getMonth() + 1;
    var curDate = date.getDate();
    if (curMonth < 10) {
        curMonth = '0' + curMonth;
    }
    if (curDate < 10) {
        curDate = "0" + curDate;
    }
    if (choice == choices.day) {
        return (curYear + "-" + curMonth + "-" + curDate);
    } else if (choice == choices.month) {
        return (curYear + "-" + curMonth);
    } else if (choice == choices.year) {
        return (curYear);
    } else if (choice == choices.quarter) {
        return (curYear + "-" + Math.floor(curMonth / 3));
    } else {
        // alert('Input not allowed.');
    }
}
/**
 * use this function as following:
 * var ans = viewByHour(bills);
 * 
 * ans[8] contains a array of all the bills in 8'clock.
 * @param {array} bills 
 */
function viewByHour(bills) {
    var ans = new Array(24);
    for (var i = 0; i < ans.length; i++) {
        ans[i] = new Array();
    }
    for (var i = 0; i < bills.length; i++) {
        ans[bills[i].time.getHours()].push(bills[i])
    }
    return ans;
}
/**
 *  Return a Dictionary/Object including arrays
 * @param {array} bills 
 */
function viewByDay(bills) {
    var ans = new Object();
    for (var i = 0; i < bills.length; i++) {
        if (ans[getDate(bills[i].time, choices.day)] == undefined) {
            ans[getDate(bills[i].time, choices.day)] = [];
        }
        ans[getDate(bills[i].time, choices.day)].push(bills[i]);
    }
    return ans;
}

/**
 * todo;
 * Viewing by week is tricky. 
 * @param {array} bills 
 */
function viewByWeek(bills) {

}
/**
 *  Return a Dictionary/Object including arrays
 * @param {array} bills 
 */
function viewByMonth(bills) {
    var ans = new Object();
    for (var i = 0; i < bills.length; i++) {
        if (ans[getDate(bills[i].time, choices.month)] == undefined) {
            ans[getDate(bills[i].time, choices.month)] = [];
        }
        ans[getDate(bills[i].time, choices.month)].push(bills[i]);
    }
    return ans;
}
/**
 *  Return a Dictionary/Object including arrays
 * @param {array} bills 
 */
function viewByQuarter(bills) {
    var ans = new Object();
    for (var i = 0; i < bills.length; i++) {
        if (ans[getDate(bills[i].time, choices.quarter)] == undefined) {
            ans[getDate(bills[i].time, choices.quarter)] = [];
        }
        ans[getDate(bills[i].time, choices.quarter)].push(bills[i]);
    }
    return ans;
}
/**
 *  Return a Dictionary/Object including arrays
 * @param {array} bills 
 */
function viewByYear(bills) {
    var ans = new Object();
    for (var i = 0; i < bills.length; i++) {
        if (ans[getDate(bills[i].time, choices.year)] == undefined) {
            ans[getDate(bills[i].time, choices.year)] = [];
        }
        ans[getDate(bills[i].time, choices.year)].push(bills[i]);
    }
    return ans;
}
/**
 *  Return a Dictionary/Object including arrays
 * @param {array} bills 
 */
function viewByMainCat(bills) {
    var ans = new Object();
    for (var i = 0; i < bills.length; i++) {
        if (ans[bills.mainCategory] == undefined) {
            ans[bills.mainCategory] = [];
        }
        ans[bills.mainCategory].push(bills[i]);
    }
    return ans;
}
/**
 *  Return a Dictionary/Object including arrays
 * @param {array} bills 
 */
function viewBySubCat(bills) {
    var ans = new Object();
    for (var i = 0; i < bills.length; i++) {
        if (ans[bills.subCategory] == undefined) {
            ans[bills.subCategory] = [];
        }
        ans[bills.subCategory].push(bills[i]);
    }
    return ans;
}
/**
 *  Return a Dictionary/Object including arrays
 * @param {array} bills 
 */
function viewByAccount(bills) {
    var ans = new Object();
    for (var i = 0; i < bills.length; i++) {
        if (ans[bills.account] == undefined) {
            ans[bills.account] = [];
        }
        ans[bills.account].push(bills[i]);
    }
    return ans;
}
/**
 *  Return a Dictionary/Object including arrays
 * @param {array} bills 
 */
function viewByItem(bills) {
    var ans = new Object();
    for (var i = 0; i < bills.length; i++) {
        if (ans[bills.item] == undefined) {
            ans[bills.item] = [];
        }
        ans[bills.item].push(bills[i]);
    }
    return ans;
}
/**
 *  Return a Dictionary/Object including arrays
 * @param {array} bills 
 */
function viewByMember(bills) {
    var ans = new Object();
    for (var i = 0; i < bills.length; i++) {
        if (ans[bills.member] == undefined) {
            ans[bills.member] = [];
        }
        ans[bills.member].push(bills[i]);
    }
    return ans;
}
/**
 *  Return a Dictionary/Object including arrays
 * @param {array} bills 
 */
function viewByMerchant(bills) {
    var ans = new Object();
    for (var i = 0; i < bills.length; i++) {
        if (ans[bills.merchant] == undefined) {
            ans[bills.merchant] = [];
        }
        ans[bills.merchant].push(bills[i]);
    }
    return ans;
}
