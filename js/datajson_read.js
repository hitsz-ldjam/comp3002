"use strict";
/**
 * READ HERE FIRST!!
    ============================================================================================
    |你主要将会使用  viewByTimeLine(); 以及  billFilter();
    |viewByTimeLine()只需要输入bills即可，billFilter()需要你仔细看一看。输入的bills需要保证按时间有序。
    |使用billFilter()函数输出一个过滤后的bills，再传入viewByTimeLine()函数，可以使用户筛选的对应的数据
    |按三级目录的形式输出。
    |
    |亦或者使用billFilter()函数，配合viewByMainCat，viewBySubCat等一系列的查看函数，输出按对应函数的
    |顺序
    |===========================================================================================
 */
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
    let viewByTime = new SingleList("year-month-day");
    for (var bill of bills) {
        var year = viewByTime.list.findIndex(function (t) {
            // 找有没有xx年的记录
            return t.token == getDate(bill.time, choices.year);
        });
        if (year == -1) {
            // 没有xx年的记录
            var viewByYear = new SingleList(getDate(bill.time, choices.year));
            var viewByMonth = new SingleList(getDate(bill.time, choices.month));
            var viewByDay = new SingleList(getDate(bill.time, choices.day));

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
                var viewByMonth = new SingleList(
                    getDate(bill.time, choices.month)
                );
                var viewByDay = new SingleList(getDate(bill.time, choices.day));

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
                    var viewByDay = new SingleList(
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

/**
 * You will not use this function.
 * @param {*} date
 * @param {*} choice
 */
var choices = {
    day: 0,
    month: 1,
    year: 2,
    quarter: 3,
};
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

// 功能待定
// /**
//  *
//  * @param {list} bills
//  * @param {list} mainCategory
//  * @param {BillType} option
//  */
// function viewByMainCat(bills, mainCategories, option) {
//     var ans = {
//         label: [],
//         amount: [],
//     };
//     var count = 0;
//     var index = {}; //记录不同的Cat在哪
//     for (var i of mainCategories) {
//         index[i] = count;
//         ans.label.push(i);
//         ans.amount.push(0);
//         count++;
//     }
//     for (var i of bills) {
//         if (i.BillType === option) {
//             ans[inedx[i.mainCategory]] += i.amount;
//         }
//     }
//     return ans;
// }
// /**
//  *
//  * @param {list} bills
//  * @param {list} mainCategory
//  * @param {BillType} option
//  */
// function viewBySubCat(bills, mainCategories, option) {
//     var ans = {
//         label: [],
//         amount: [],
//     };
//     var count = 0;
//     var index = {}; //记录不同的Cat在哪
//     for (var i of mainCategories) {
//         for (var j of i.subCategories) {
//             index[j] = count;
//             ans.label.push(j);
//             ans.amount.push(0);
//             count++;
//         }
//     }
//     for (var i of bills) {
//         if (i.BillType === option) {
//             ans[index[i.subCategory]] += i.amount;
//         }
//     }
//     return ans;
// }
/**
 *
 * @param {list} bills
 * @param {oneArray} oneArray  declared in utils.js
 * @param {BillType} option declared in utils.js
 */
function viewByOneArray(bills, oneArray, option) {
    var ans = {
        label: [],
        amount: [],
    };
    var temp = {};
    for (var bill of bills) {
        if (temp[bill[oneArray]] === undefined) {
            temp[bill[oneArray]] = 0;
        }
        if (bill.type === option) {
            temp[bill[oneArray]] += bills.amount;
        }
    }
    for (var key of Object.keys(temp)) {
        ans.label.push(key);
        ans.amount.push(temp[key]);
    }
    return ans;
}

/**
 * Please make sure input is correct. Call this function as following:
 *
 * filter(bills=bills, Object = ob)
 *
 * Object has these attributes.
 * @param {array}       bills
 * @param {string}      account : [acc1,acc2,acc3, ...]   $
 * @param {numberRange} amount : [start, end]        *
 * @param {int}         type , true: income; flase: cost     %
 * @param {string}      flag , defined: name of account   %
 * @param {string}      mainCat , [cat1, cat2,...,catn]   $
 * @param {string}      subCat , [cat1, cat2,...,catn]    $
 * @param {dateRange}   time : [startDate, endDate]    *
 * @param {string}      member : [mem1, mem2, mem3,...]   $
 * @param {string}      merchant : [mer1, mer2,...]       $
 * @param {string}      item : [it1, it2, ...]            $
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
                    // f[key] = false;
                    if (bill[key] == i) {
                        f[key] = true;
                    }
                }
            }
        }
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
