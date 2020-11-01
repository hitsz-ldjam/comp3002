"use strict";

/** @returns {Number} Random int in [min, max) */
function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

/** @description Color string for Chart.js */
function randomColorString() {
    var r = randomInt(0, 256);
    var g = randomInt(0, 256);
    var b = randomInt(0, 256);
    return `rgb(${r}, ${g}, ${b})`;
}

// /**
//  * @param {Chart} chart Doughnut chart
//  * @param {string} account
//  * @param {Date} start Start time
//  * @param {Date} end End time
//  */
// function updateDoughnut(chart, account, start, end) {
//     // todo: dirty code / cache this
//     let data = {
//         datasets: [{
//             backgroundColor: [],
//             data: []
//         }],
//         labels: []
//     };

//     for (const accountObj of g_DataJson.accounts)
//         if (accountObj.name === account) {
//             let mainCats = new Map();
//             for (const bill of accountObj.bills) {
//                 let date = new Date(bill.time);
//                 if (start instanceof Date && start > date)
//                     continue;
//                 if (end instanceof Date && end < date)
//                     continue;
//                 if (mainCats.has(bill.mainCategory)) {
//                     let amount = mainCats.get(bill.mainCategory);
//                     // todo: switch by accountObj.type
//                     amount += bill.amount;
//                     mainCats.set(bill.mainCategory, amount);
//                     // todo: handle sub category
//                 }
//                 else {
//                     mainCats.set(bill.mainCategory, 0);
//                     // todo: handle sub category
//                 }
//             }

//             for (let [key, value] of mainCats) {
//                 data.datasets[0].backgroundColor.push(randomColorString());
//                 data.datasets[0].data.push(value);
//                 data.labels.push(key);
//             }
//             chart.data = data;
//             chart.update();
//             return true;
//         }

//     return false;
// }
function updateDoughnut(chart, bills = global.dataJson.bills) {
    // todo: dirty code / cache this
    let data = {
        datasets: [
            {
                backgroundColor: [],
                data: [],
            },
        ],
        labels: [],
    };

    let mainCategories = new Map();
    for (const bill of bills) {
        if (bill.flag) continue;
        let amount = 0;
        if (mainCategories.has(bill.mainCategory))
            amount = mainCategories.get(bill.mainCategory);
        if (bill.type === BillType.income) amount += bill.amount;
        else if (bill.type === BillType.expense) amount -= bill.amount;
        else continue;
        // bug: final amount should > 0
        mainCategories.set(bill.mainCategory, amount);
        // todo: handle sub category
    }

    for (let [key, value] of mainCategories) {
        data.datasets[0].backgroundColor.push(randomColorString());
        data.datasets[0].data.push(value);
        data.labels.push(key);
    }
    chart.data = data;
    chart.update();
}
$("#account").click(function () {
    window.choice = OneArray.account;
    console.log("account selected");
    console.log("choice is ", window.choice);
    showChart();
});
$("#mainCategory").click(function () {
    console.log("mainCategory selected");
    window.choice = OneArray.mainCategory;
    console.log("choice is ", window.choice, "");
    showChart();
});
$("#subCategory").click(function () {
    window.choice = OneArray.subCategory;
    showChart();
});
$("#member").click(function () {
    console.log("member selected");
    window.choice = OneArray.member;
    showChart();
});
$("#merchant").click(function () {
    console.log("merchant selected");
    window.choice = OneArray.merchant;
    showChart();
});
$("#item").click(function () {
    console.log("item selected");
    window.choice = OneArray.item;
    showChart();
});

$("#income").click(function () {
    window.billType = BillType.income;
    showChart();
});
$("#expense").click(function () {
    window.billType = BillType.expense;
    showChart();
});
window.choice = OneArray.account;
window.billType = BillType.income;
$(function () {
    showChart();
});

function showChart() {
    // todo: set CSP

    // Disable automatic style injection
    Chart.platform.disableCSSInjection = true;

    let ctx = $("canvas#doughnut-chart")[0].getContext("2d");

    let data = {
        datasets: [
            {
                backgroundColor: [],
                data: [],
            },
        ],
        labels: [],
    };

    let chart = new Chart(ctx, {
        type: "doughnut",
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            // todo: comment the following options on PC
            // ----------------------
            // legend: {
            //     labels: {
            //         fontSize: 40
            //     }
            // },
            // tooltips: {
            //     bodyFontSize: 30
            // }
            // -----------------------
        },
    });

    /** @type {Array} */
    let bills = global.dataJson.bills.slice();

    // bills = bills.filter(bill => {
    //     return DateUtils.parse(bill.time) > new Date(2020, 10, 15);
    // });

    // bills = bills.slice(3);

    console.log("choice is ", choice);
    const re = viewByOneArray(bills, window.choice, window.billType);
    console.log("re is ", re);
    data = {
        datasets: [
            {
                backgroundColor: [],
                data: [],
            },
        ],
        labels: [],
    };

    data.labels = re.get("labels");

    for (const amt of re.get("data")) {
        data.datasets[0].backgroundColor.push(randomColorString());
        data.datasets[0].data.push(amt);
    }

    console.log(re);
    chart.data = data;
    chart.update();
}
