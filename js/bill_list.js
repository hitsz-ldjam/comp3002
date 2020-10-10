'use strict';


$(function () {
    $('button#add-bill').click(_ => { window.location.href = 'bill_add.html'; });
    $('button#show-chart').click(_ => { window.location.href = 'doughnut_chart.html'; });
    updateCards();
});


function updateCards() {
    let str = '';
    for (const bill of global.dataJson.bills) {
        str += JSON.stringify(bill);
    }
    $('textarea#cards').val(str);
}
