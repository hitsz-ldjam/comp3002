'use strict';


$(function () {
    const viewParams = {
        /** @type {string} */
        aggregateProperty: OneArray.account,
        /** @type {number} */
        billType: BillType.income,
        /** @type {Date} */
        beginTime: null,
        /** @type {Date} */
        endTime: null,
    };

    /** @type {Chart} */
    const chart = function () {
        // todo: set CSP
        // Disable automatic style injection
        Chart.platform.disableCSSInjection = true;
        let ctx = $('canvas#doughnut-chart')[0].getContext('2d');
        let data = {
            datasets: [{ backgroundColor: [], data: [] }],
            labels: []
        };
        return new Chart(ctx, {
            type: 'doughnut',
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
            }
        });
    }();

    updateChart(chart, viewParams);


    $('button#account').click(_ => {
        viewParams.aggregateProperty = OneArray.account;
        updateChart(chart, viewParams);
    });

    $('button#mainCategory').click(_ => {
        viewParams.aggregateProperty = OneArray.mainCategory;
        updateChart(chart, viewParams);
    });

    $('button#subCategory').click(_ => {
        viewParams.aggregateProperty = OneArray.subCategory;
        updateChart(chart, viewParams);
    });

    $('button#member').click(_ => {
        viewParams.aggregateProperty = OneArray.member;
        updateChart(chart, viewParams);
    });

    $('button#merchant').click(_ => {
        viewParams.aggregateProperty = OneArray.merchant;
        updateChart(chart, viewParams);
    });

    $('button#item').click(_ => {
        viewParams.aggregateProperty = OneArray.item;
        updateChart(chart, viewParams);
    });

    $('button#income').click(_ => {
        viewParams.billType = BillType.income;
        updateChart(chart, viewParams);
    });

    $('button#expense').click(_ => {
        viewParams.billType = BillType.expense;
        updateChart(chart, viewParams);
    });

    $('input#begin-time').change(function () {
        const timeStr = $(this).val();
        if (timeStr.length === 10) {
            viewParams.beginTime = new Date(timeStr);
            viewParams.beginTime.setHours(0);
        }
        else
            viewParams.beginTime = null;
        updateChart(chart, viewParams);
    });

    $('input#end-time').change(function () {
        const timeStr = $(this).val();
        if (timeStr.length === 10) {
            viewParams.endTime = new Date(timeStr);
            viewParams.endTime.setHours(23);
            viewParams.endTime.setMinutes(59);
            viewParams.endTime.setSeconds(59);
        }
        else
            viewParams.endTime = null;
        updateChart(chart, viewParams);
    });
});


/** @returns {Number} Random int in [min, max) */
function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

/** @description Color string for Chart.js */
function randomColorString() {
    const r = randomInt(0, 256);
    const g = randomInt(0, 256);
    const b = randomInt(0, 256);
    return `rgb(${r}, ${g}, ${b})`;
}


function updateChart(chart, param) {
    /** @type {Array} */
    let bills = global.dataJson.bills.slice();

    const filterBegin = Boolean(param.beginTime);
    const filterEnd = Boolean(param.endTime);
    bills = bills.filter(bill => {
        const time = DateUtils.parse(bill.time);
        return (!filterBegin || time > param.beginTime) && (!filterEnd || time < param.endTime);
    });

    const re = viewByOneArray(bills, param.aggregateProperty, param.billType);
    const data = {
        datasets: [{ backgroundColor: [], data: [] }],
        labels: []
    };
    data.labels = re.get('labels');
    for (const amt of re.get('data')) {
        data.datasets[0].backgroundColor.push(randomColorString());
        data.datasets[0].data.push(amt);
    }

    chart.data = data;
    chart.update();
}
