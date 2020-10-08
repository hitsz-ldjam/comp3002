'use strict';

let data = []

$(function() {
    Get_bill_input();
    // $("button#rm-item").click((event) => {  // 此处为了测试方便, 直接把rmitem键用于测试函数
    //     divideDataByMainCat(data);
    // })
});

function Get_bill_input() {
    // If you want to change button, just change '#add-item' to the button's id. 
    $("button#add-item").click((event) => {
        let mainCat = $.trim($("input#main-category").val());
        let subCat = $.trim($("input#sub-category").val());
        let amountStr = $("input#amount").val();
        let timeStr = $.trim($("input#time").val());
        let toc = $.trim($("input#toc").val()); // 支付方式
        let noteStr = $.trim($("input#note").val());
        let membersStr = $.trim($("input#members").val());
        let tradersStr = $.trim($("input#traders").val());
        let itemStr = $.trim($("input#item").val());
        // if (!mainCat || !subCat || !amountStr || !timeStr) {
        //     showMessage(`Please input data`);
        //     return;
        // }
        let amount = +amountStr;
        // Make sure amount is correct.
        if (typeof amount !== "number" || !isFinite(amount)) {
            showMessage(`amount ${amountStr} is invalid`);
            return;
        }

        // todo: Make sure all the data were input correctly.
        let reg1 = new RegExp("-", "g"); //g,表示全部替换。
        timeStr = timeStr.replace(reg1, "");
        let reg2 = new RegExp("T", "g"); //g,表示全部替换。
        timeStr = timeStr.replace(reg2, "");
        let reg3 = new RegExp(":", "g"); //g,表示全部替换。
        timeStr = timeStr.replace(reg3, "");
        timeStr = +timeStr;

        // Test for input
        console.log(mainCat);
        console.log(subCat);
        console.log(amount);
        console.log(timeStr);
        console.log(noteStr);
        console.log(toc);
        console.log(membersStr);
        console.log(tradersStr);
        console.log(itemStr);

        addData(mainCat, subCat, timeStr, toc, amountStr, noteStr, membersStr, tradersStr, itemStr);

    });
}

function addData(mainCat, subCat, timeStr, toc, amountStr, noteStr, membersStr, tradersStr, itemStr) {
    let tempSingleData = {}
    tempSingleData.mainCategory = mainCat;
    tempSingleData.subCategory = subCat;
    tempSingleData.time = timeStr;
    tempSingleData.typeOfCounting = toc;
    tempSingleData.amount = amountStr;
    tempSingleData.note = noteStr;
    tempSingleData.member = membersStr;
    tempSingleData.trader = tradersStr;
    tempSingleData.item = itemStr;

    data.push(tempSingleData);
    // test for pushing tempdata to data.
    console.log(data);
}

function rmData() {
    // 用户选中某条数据后,点击删除按钮即可删除;
    // 参数需要与其他人员沟通
    // 目前想法: 搞个id? 或者传个时间,时间应该是唯一的

}

function sortDataByTime(data) {
    return data.sort(function(obj1, obj2) {
        var val1 = obj1.time;
        var val2 = obj2.time;
        if (val1 < val2) {
            return -1;
        } else if (val1 > val2) {
            return 1;
        } else {
            return 0;
        }
    })
}

/// 返回一个对象, Key是每一天, value为这一天记的账(数组)
/// 注意: 一天内的数据可能无序, 要先执行sortDataByTime才能有序
function divideDataByDay() {
    let ans = {};
    for (let i of data) {
        if (ans[Math.floor(i.time / 10000).toString()] === undefined)
            ans[Math.floor(i.time / 10000).toString()] = [];
        ans[Math.floor(i.time / 10000).toString()].push(i);
    }
    console.log(ans);
    return ans;
}

function divideDataByWeek() {
    // todo: 怎么确定星期
}

function divideDataByMonth() {
    let ans = {};
    for (let i of data) {
        if (ans[Math.floor(i.time / 1000000).toString()] === undefined)
            ans[Math.floor(i.time / 1000000).toString()] = [];
        ans[Math.floor(i.time / 1000000).toString()].push(i);
    }
    console.log(ans);
    return ans;
}

function divideDataByYear() {
    let ans = {};
    for (let i of data) {
        if (ans[Math.floor(i.time / 100000000).toString()] === undefined)
            ans[Math.floor(i.time / 100000000).toString()] = [];
        ans[Math.floor(i.time / 100000000).toString()].push(i);
    }
    console.log(ans);
    return ans;
}

function divideDataByMainCat(dt) {
    let temp = $.extend(true, [], dt); // 深拷贝, 不改变data
    let res = [];
    while (temp.length !== 0) {
        let list = temp.shift();
        let arr = [list];
        for (let i = 0; i < temp.length; i++) {
            if (temp[i].mainCategory == list.mainCategory) {
                arr = arr.concat(temp.splice(i, 1));
                i--;
            }
        }
        res.push(arr);
    }
    console.log(res);
}
/// 按道理不同maincat里的subcat应该是不一样的, 所以不考虑maincat了
/// 
function divideDataBySubCat(dt) {
    let temp = $.extend(true, [], dt); // 深拷贝, 不改变data
    let res = [];
    while (temp.length !== 0) {
        let list = temp.shift();
        let arr = [list];
        for (let i = 0; i < temp.length; i++) {
            if (temp[i].subCategory == list.subCategory) {
                arr = arr.concat(temp.splice(i, 1));
                i--;
            }
        }
        res.push(arr);
    }
    console.log(res);
}

function divideDataByMember(dt) {
    let temp = $.extend(true, [], dt); // 深拷贝, 不改变data
    let res = [];
    while (temp.length !== 0) {
        let list = temp.shift();
        let arr = [list];
        for (let i = 0; i < temp.length; i++) {
            if (temp[i].member == list.member) {
                arr = arr.concat(temp.splice(i, 1));
                i--;
            }
        }
        res.push(arr);
    }
    console.log(res);
}

function divideDataByTrader(dt) {
    let temp = $.extend(true, [], dt); // 深拷贝, 不改变data
    let res = [];
    while (temp.length !== 0) {
        let list = temp.shift();
        let arr = [list];
        for (let i = 0; i < temp.length; i++) {
            if (temp[i].trader == list.trader) {
                arr = arr.concat(temp.splice(i, 1));
                i--;
            }
        }
        res.push(arr);
    }
    console.log(res);
}