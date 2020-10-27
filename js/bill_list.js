'use strict';


$(function () {
    $('button#add-bill').click(_ => {
        window.location.href = 'bill_add.html';
    });
    $('a#show-chart').click(_ => {
        window.location.href = 'doughnut_chart.html';
    });
    $('a#export').click(_ => {
        window.location.href = 'login.html';
    });
    updateCard(document.getElementById('CardContainer'));
});

class CardList {
    constructor(DataList) {
        this.DataList = DataList;
    }

    CreateCardList(container) {

        this.DataList.forEach(element => {
            var cardtemplet = new Card(element);
            cardtemplet.CreateCard(container);
        });
    }
}

class Card {
    constructor(data) {
        this.type = data.type;
        this.account = data.account;
        this.mainCat = data.mainCategory;
        this.subCat = data.subCategory;
        this.time = DateUtils.parse(data.time).toLocaleTimeString();
        this.amount = data.amount;
    }
    CreateCard(container) {
        // alert('hascreated');

        var AddCard = document.createElement('div');
        AddCard.setAttribute('class', 'card');
        container.appendChild(AddCard);

        var AddCardBody = document.createElement('div');
        AddCardBody.setAttribute('class', 'card-body');
        AddCard.appendChild(AddCardBody);

        var AddCardText = document.createElement('div');
        AddCardText.setAttribute('class', 'card-text row justify-content-between');
        AddCardBody.appendChild(AddCardText);

        var addBillIcon = document.createElement('div');
        addBillIcon.setAttribute('class', 'col-3');
        addBillIcon.innerHTML = '';
        AddCardText.appendChild(addBillIcon);

        var addBillCatandTime = document.createElement('div');
        addBillCatandTime.setAttribute('class', 'bill-catandtime col-6');
        addBillCatandTime.innerHTML = this.mainCat + '>' + this.subCat + '<br>' + this.time;
        AddCardText.appendChild(addBillCatandTime);

        var addBillAmount = document.createElement('div');
        addBillAmount.setAttribute('class', 'bill-amount col-3 pr-4 pt-4 pb-4');
        addBillAmount.innerHTML = (this.type == BillType.income ? "+" : "-") + this.amount;
        AddCardText.appendChild(addBillAmount);
        // <div class="card-body">
        //             <div class="card-text row justify-content-between">
        //                 <div class="bill-type col-3">time</div>
        //                 <div class='bill-catandtime col-6'>mainCat/subCat</div>
        //                 <div class="bill-amount col-3"><b>amount</b></div>
        //             </div>
        //         </div>
    }


}

function updateCard(container) {
    var cardlist = new CardList(global.dataJson.bills);
    cardlist.CreateCardList(container);
}