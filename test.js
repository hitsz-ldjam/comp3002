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
        var f = false;
        for (var key of Object.keys(tempOb)) {
            // 如果是flag(单个字符串) 或者 type

            if ((key == 'flag' || key == 'type')) {
                if (bill[key] === tempOb[key]) {
                    f = true;
                } else {
                    f = false;
                    break;
                }
            } else if (key == 'time' || key == 'amount') { // 如果是日期或者金额范围
                if (bill[key] >= tempOb[key][0] && bill[key] <= tempOb[key][1]) {
                    f = true;
                } else {
                    f = false;
                    break;
                }
            } else { // 其余的数组类型
                f = function(tempOb, bill, key) {
                    for (var i of tempOb[key]) {
                        if (bill[key] == i) {
                            return true;
                        }
                    }
                    return false;
                }
            }
        }
        if (f) {
            ans.push(bill);
        }
    }
    return ans;
}

bills = [{
    account: "现金",
    amount: 20,
    type: 0,
    flag: "",
    mainCategory: "食物",
    subCategory: "早餐",
    time: "2020-10-20",
    member: "我",
    merchant: "",
    item: ""
}, {
    account: "银行卡",
    amount: 200,
    type: 0,
    flag: "",
    mainCategory: "食物",
    subCategory: "早餐",
    time: "2020-09-13",
    member: "我",
    merchant: "",
    item: ""
}, {
    account: "银行卡",
    amount: 220,
    type: 1,
    flag: "",
    mainCategory: "食物",
    subCategory: "早餐",
    time: "2020-09-15",
    member: "我",
    merchant: "",
    item: ""
}, {
    account: "现金",
    amount: 20,
    type: 0,
    flag: "",
    mainCategory: "食物",
    subCategory: "早餐",
    time: "2020-8-30",
    member: "我",
    merchant: "",
    item: ""
}]

ob = {
    account: ["银行卡", "现金"],
    amount: [0, 100],
    type: null,
    flag: null,
    mainCategory: null,
    subCategory: null,
    time: null,
    member: null,
    merchant: null,
    item: null
}

console.log(billFilter(bills, ob));