'use strict';


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
        datasets: [{
            backgroundColor: [],
            data: []
        }],
        labels: []
    };

    let mainCategories = new Map();
    for (const bill of bills) {
        if (bill.flag)
            continue;
        let amount = 0;
        if (mainCategories.has(bill.mainCategory))
            amount = mainCategories.get(bill.mainCategory);
        if (bill.type === BillType.income)
            amount += bill.amount;
        else if (bill.type === BillType.expense)
            amount -= bill.amount;
        else
            continue;
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


$(function () {
    // todo: set CSP

    // Disable automatic style injection
    Chart.platform.disableCSSInjection = true;

    let ctx = $("canvas#doughnut-chart")[0].getContext('2d');

    let data = {
        datasets: [{
            backgroundColor: [],
            data: []
        }],
        labels: []
    };

    let chart = new Chart(ctx, {
        type: 'doughnut',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });

    updateDoughnut(chart);
});
