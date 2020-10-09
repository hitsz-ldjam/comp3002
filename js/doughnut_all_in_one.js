'use strict';


/**
 * @param {Chart} chart Doughnut chart
 * @param {string} account
 * @param {Date} start Start time
 * @param {Date} end End time
 */
function updateDoughnut(chart, account, start, end) {
    // todo: dirty code / cache this
    let data = {
        datasets: [{
            backgroundColor: [],
            data: []
        }],
        labels: []
    };

    for (const accountObj of g_DataJson.accounts)
        if (accountObj.name === account) {
            let mainCats = new Map();
            for (const bill of accountObj.bills) {
                let date = new Date(bill.time);
                if (start instanceof Date && start > date)
                    continue;
                if (end instanceof Date && end < date)
                    continue;
                if (mainCats.has(bill.mainCategory)) {
                    let amount = mainCats.get(bill.mainCategory);
                    // todo: switch by accountObj.type
                    amount += bill.amount;
                    mainCats.set(bill.mainCategory, amount);
                    // todo: handle sub category
                }
                else {
                    mainCats.set(bill.mainCategory, 0);
                    // todo: handle sub category
                }
            }

            for (let [key, value] of mainCats) {
                data.datasets[0].backgroundColor.push(randomColorString());
                data.datasets[0].data.push(value);
                data.labels.push(key);
            }
            chart.data = data;
            chart.update();
            return true;
        }

    return false;
}


// todo: move to elsewhere

var g_DemoDoughnut = null;

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

    g_DemoDoughnut = new Chart(ctx, {
        type: 'doughnut',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
});
