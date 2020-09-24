'use strict';

var gDataJSON = {};
var gDemoDoughnut = null;

$(function () {
    // todo: set CSP
    // Disable automatic style injection
    Chart.platform.disableCSSInjection = true;

    $('button#add-item').click(event => {
        var mainCat = $('input#main-category').val();
        var subCat = $('input#sub-category').val();
        var amountStr = $('input#amount').val();
        if (!mainCat || !subCat || !amountStr) {
            showMessage(`Please input data`);
            return;
        }
        addJsonItem(mainCat, subCat, amountStr);
    });

    $('button#rm-item').click(event => {
        var mainCat = $('input#main-category').val();
        var subCat = $('input#sub-category').val();
        if (!mainCat) {
            showMessage(`Please input data`);
            return;
        }
        rmJsonItem(mainCat, subCat);
    });

    var ctx = $("canvas#doughnut-display")[0].getContext('2d');

    var data = {
        datasets: [{
            backgroundColor: [],
            data: []
        }],
        labels: []
    };

    gDemoDoughnut = new Chart(ctx, {
        type: 'doughnut',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
});



function addJsonItem(mainCat, subCat, amountStr) {
    var amount = +amountStr;
    if (typeof amount !== "number" || !isFinite(amount)) {
        showMessage(`amount ${amountStr} is invalid`);
        return;
    }
    if (gDataJSON[mainCat] === undefined)
        gDataJSON[mainCat] = {};
    if (gDataJSON[mainCat][subCat] !== undefined)
        logMessage(`override value at ${mainCat}.${subCat}`);
    gDataJSON[mainCat][subCat] = amount;
    updateDisplay();
}



function rmJsonItem(mainCat, subCat) {
    if (!subCat) {
        // todo: validate
        delete gDataJSON[mainCat];
    }
    else {
        // todo: validate
        // potential bug: empty main category
        delete gDataJSON[mainCat][subCat];
    }
    updateDisplay();
}



function updateDisplay() {
    $('textarea#maindata').val(JSON.stringify(gDataJSON));
    // todo: dirty code / cache this
    var data = {
        datasets: [{
            backgroundColor: [],
            data: []
        }],
        labels: []
    };
    // mainCat is string
    for (var mainCat in gDataJSON)
        if (gDataJSON.hasOwnProperty(mainCat)) {
            var totalAmount = 0;
            for (var subCat in gDataJSON[mainCat])
                if (gDataJSON[mainCat].hasOwnProperty(subCat)) {
                    // console.log(`${mainCat} ${subCat} ${gDataJSON[mainCat][subCat]}`);
                    totalAmount += gDataJSON[mainCat][subCat];
                }
            if (totalAmount === 0)
                continue;
            data.datasets[0].backgroundColor.push(getRandomColorString());
            data.datasets[0].data.push(totalAmount);
            data.labels.push(mainCat);
        }
    gDemoDoughnut.data = data;
    gDemoDoughnut.update();
}
