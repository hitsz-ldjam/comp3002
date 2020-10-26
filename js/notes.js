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
    member, merchant,item are not defined, those function for them will return as following:
    undefined: [
    {
      account: '现金',
      amount: 20,
      type: 0,
      flag: '',
      ...
    }]
    ============================================================================================
    |你主要将会使用  viewByTimeLine(); 以及  billFilter();
    |viewByTimeLine()只需要输入bills即可，billFilter()需要你仔细看一看。输入的bills需要保证按时间有序。
    |使用billFilter()函数输出一个过滤后的bills，再传入viewByTimeLine()函数，可以使用户筛选的对应的数据
    |按三级目录的形式输出。
    |
    |亦或者使用billFilter()函数，配合viewByMainCat，viewBySubCat等一系列的查看函数，输出按对应函数的
    |顺序（注意：这些函数是平面的，并没有像时间那样可以有三级的目录表示）
    |===========================================================================================
 */
class singleList {
    constructor(token) {
        this.token = token;
        this.income = 0;
        this.expense = 0;
        this.remain = 0;
        this.list = [];
    }
}
/**
 * Returns a sorted list as following.
 *{
    "token": "year-month-day",
    "income": 200,
    "expense": 400,
    "remain": -200,
    "list": [{
        "token": "2020",
        "income": 200,
        "expense": 400,
        "remain": -200,
        "list": [{
            "title": "9",
            "income": 200,
            "expense": 400,
            "remain": -200,
            "list": [{
                "title": "28",
                "income": 200,
                "expense": 400,
                "remain": -200,
                "list": [{
                    // this is a bill
                }]
            }]
        }]
    }]
}
 * @param {list} bills
 */
function viewByTimeLine(bills) {
    let viewByTime = new singleList("year-month-day");
    for (var bill of bills) {
        var year = viewByTime.list.findIndex(function (t) {
            // 找有没有xx年的记录
            return t.token == getDate(bill.time, choices.year);
        });
        if (year == -1) {
            // 没有xx年的记录
            var viewByYear = new singleList(getDate(bill.time, choices.year));
            var viewByMonth = new singleList(getDate(bill.time, choices.month));
            var viewByDay = new singleList(getDate(bill.time, choices.day));

            if (bill.type == BillType.income) {
                viewByDay.income += bill.amount;
                viewByMonth.income += bill.amount;
                viewByYear.income += bill.amount;
                viewByTime.income += bill.amount;
            } else if (bill.type == BillType.expense) {
                viewByDay.expense += bill.amount;
                viewByMonth.expense += bill.amount;
                viewByYear.expense += bill.amount;
                viewByTime.expense += bill.amount;
            }
            viewByDay.remain = viewByDay.income - viewByDay.expense;
            viewByMonth.remain = viewByMonth.income - viewByMonth.expense;
            viewByYear.remain = viewByYear.income - viewByYear.expense;
            viewByTime.remain = viewByTime.income - viewByTime.expense;

            viewByDay.list.push(bill);
            viewByMonth.list.push(viewByDay);
            viewByYear.list.push(viewByMonth);
            viewByTime.list.push(viewByYear);
        } else {
            var month = viewByTime.list[year].list.findIndex(function (t) {
                // 找有没有xx月的记录
                return t.token == getDate(bill.time, choices.month);
            });
            if (month == -1) {
                // 没有xx月的记录
                var viewByMonth = new singleList(
                    getDate(bill.time, choices.month)
                );
                var viewByDay = new singleList(getDate(bill.time, choices.day));

                if (bill.type == BillType.income) {
                    viewByDay.income += bill.amount;
                    viewByMonth.income += bill.amount;
                    viewByTime.list[year].income += bill.amount;
                    viewByTime.income += bill.amount;
                } else if (bill.type == BillType.expense) {
                    viewByDay.expense += bill.amount;
                    viewByMonth.expense += bill.amount;
                    viewByTime.list[year].expense += bill.amount;
                    viewByTime.expense += bill.amount;
                }
                viewByDay.remain = viewByDay.income - viewByDay.expense;
                viewByMonth.remain = viewByMonth.income - viewByMonth.expense;
                viewByTime.list[year].remain =
                    viewByTime.list[year].income -
                    viewByTime.list[year].expense;
                viewByTime.remain = viewByTime.income - viewByTime.expense;

                viewByDay.list.push(bill);
                viewByMonth.list.push(viewByDay);
                viewByTime.list[year].list.push(viewByMonth);
            } else {
                var day = viewByTime.list[year].list[month].list.findIndex(
                    function (t) {
                        // 找有没有xx日的记录
                        return t.token == getDate(bill.time, choices.day);
                    }
                );
                if (day == -1) {
                    // 没有xx日的记录
                    var viewByDay = new singleList(
                        getDate(bill.time, choices.day)
                    );
                    if (bill.type == BillType.income) {
                        viewByDay.income += bill.amount;
                        viewByTime.list[year].list[month].income += bill.amount;
                        viewByTime.list[year].income += bill.amount;
                        viewByTime.income += bill.amount;
                    } else if (bill.type == BillType.expense) {
                        viewByDay.expense += bill.amount;
                        viewByTime.list[year].list[month].expense +=
                            bill.amount;
                        viewByTime.list[year].expense += bill.amount;
                        viewByTime.expense += bill.amount;
                    }
                    viewByDay.remain = viewByDay.income - viewByDay.expense;
                    viewByTime.list[year].list[month].remain =
                        viewByTime.list[year].list[month].income -
                        viewByTime.list[year].list[month].expense;
                    viewByTime.list[year].remain =
                        viewByTime.list[year].income -
                        viewByTime.list[year].expense;
                    viewByTime.remain = viewByTime.income - viewByTime.expense;

                    viewByDay.list.push(bill);
                    viewByTime.list[year].list[month].list.push(viewByDay);
                } else {
                    // 全部找到了
                    if (bill.type == BillType.income) {
                        viewByTime.list[year].list[month].list[day].income +=
                            bill.amount;
                        viewByTime.list[year].list[month].income += bill.amount;
                        viewByTime.list[year].income += bill.amount;
                        viewByTime.income += bill.amount;
                    } else if (bill.type == BillType.expense) {
                        viewByTime.list[year].list[month].list[day].expense +=
                            bill.amount;
                        viewByTime.list[year].list[month].expense +=
                            bill.amount;
                        viewByTime.list[year].expense += bill.amount;
                        viewByTime.expense += bill.amount;
                    }
                    viewByTime.list[year].list[month].list[day].remain =
                        viewByTime.list[year].list[month].list[day].income -
                        viewByTime.list[year].list[month].list[day].expense;
                    viewByTime.list[year].list[month].remain =
                        viewByTime.list[year].list[month].income -
                        viewByTime.list[year].list[month].expense;
                    viewByTime.list[year].remain =
                        viewByTime.list[year].income -
                        viewByTime.list[year].expense;
                    viewByTime.remain = viewByTime.income - viewByTime.expense;

                    viewByTime.list[year].list[month].list[day].list.push(bill);
                }
            }
        }
    }
    return viewByTime;
}

var choices = {
    day: 0,
    month: 1,
    year: 2,
    quarter: 3,
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
        curMonth = "0" + curMonth;
    }
    if (curDate < 10) {
        curDate = "0" + curDate;
    }
    if (choice == choices.day) {
        return curYear + "-" + curMonth + "-" + curDate;
    } else if (choice == choices.month) {
        return curYear + "-" + curMonth;
    } else if (choice == choices.year) {
        return curYear;
    } else if (choice == choices.quarter) {
        return curYear + "-" + Math.floor(curMonth / 3);
    } else {
        // alert('Input not allowed.');
    }
}
/**
 *
 * @param {list} bills
 * @param {list} mainCategory
 * @param {BillType} option
 */
function viewByMainCat(bills, mainCategories, option) {
    var ans = {};
    for (var i of mainCategories) {
        if (ans[i.name] === undefined) {
            ans[i.name] = 0;
        }
    }
    for (var i of bills) {
        if (i.BillType === option) {
            ans[i.mainCategory] += i.amount;
        }
    }
    return ans;
}
/**
 *
 * @param {list} bills
 * @param {list} mainCategory
 * @param {BillType} option
 */
function viewBySubCat(bills, mainCategories, option) {
    var ans = {};
    for (var i of mainCategories) {
        for (var j of subCategories) {
            if (ans[j] === undefined) {
                ans[j] = 0;
            }
        }
    }
    for (var i of bills) {
        if (i.BillType === option) {
            ans[i.subCategory] += i.amount;
        }
    }
    return ans;
}

/**
 *  Return a Dictionary/Object including arrays
 * @param {array} bills
 */
function viewByAccount(bills) {
    var ans = [];
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
function viewByMember(bills, memberList) {
    var ans = {};
    for (var j of memberList) {
        ans[j] = 0;
    }
    for (var j of memberList) {
        for (var i of bills) {
            if (i.BillType === option && i.member === j) {
                ans[j] += i.amount;
            }
        }
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

/**
 * Please make sure input is correct. Call this function as following:
 *
 * filter(bills=bills, Object = ob)
 *
 * Object has these attributes.
 * @param {array} bills
 * @param {string} account : [acc1,acc2,acc3, ...]   $
 * @param {numberRange} amount : [start, end]        *
 * @param {int} type , true: income; flase: cost    %
 * @param {string} flag , defined: name of account   %
 * @param {string} mainCat , [cat1, cat2,...,catn]   $
 * @param {string} subCat , [cat1, cat2,...,catn]    $
 * @param {dateRange} time : [startDate, endDate]    *
 * @param {string} member : [mem1, mem2, mem3,...]   $
 * @param {string} merchant : [mer1, mer2,...]       $
 * @param {string} item : [it1, it2, ...]            $
 */
function billFilter(bills, object) {
    var tempOb = new Object();
    for (var key of Object.keys(object)) {
        if (object[key] == null) {
            continue;
        } else {
            tempOb[key] = object[key]; // Get all the defined attributes
        }
    }
    var ans = [];
    for (var bill of bills) {
        var f = {};
        for (var key of Object.keys(tempOb)) {
            // 如果是flag(单个字符串) 或者 type
            f[String(key)] = false;
            if (key == "flag" || key == "type") {
                if (bill[key] === tempOb[key]) {
                    f[key] = true;
                } else {
                    f[key] = false;
                }
            } else if (key == "time" || key == "amount") {
                // 如果是日期或者金额范围
                if (
                    bill[key] >= tempOb[key][0] &&
                    bill[key] <= tempOb[key][1]
                ) {
                    f[key] = true;
                } else {
                    f[key] = false;
                }
            } else {
                // 其余的数组类型
                for (var i of tempOb[key]) {
                    f[key] = false;
                    if (bill[key] == i) {
                        f[key] = true;
                    }
                }
            }
        }
        // console.log(typeof key, key, bill[key]);
        // console.log("f = ", f);
        var flag = true;
        for (var key of Object.keys(tempOb)) {
            flag &= f[key];
        }
        if (flag) {
            ans.push(bill);
        }
    }
    return ans;
}

// for test:
// module.exports = {
//     billFilter,
//     viewByTimeLine,
// };
