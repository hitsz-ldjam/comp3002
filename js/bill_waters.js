/*dropdownmenu
    card
    cardbody
        button
    collapse(menu_content)
     <div class="card">
        <div class="card-body">
            <button class="" type="button"
            data-toggle="collapse" data-target="#collapse-year-0"">
                <div class="container">
                </div>
            </button>
        <div class="collapse" style="background-color: whitesmoke;" id="collapse-year-0">*/


class year {
    constructor(data, tagID) {
        this.year = data.token;
        this.income = data.income;
        this.expense = data.expense;
        this.remain = data.remain;
        this.dataList = data.list;
        this.tagID = tagID;
    }
    create() {
        // alert("year");

        var year_card = $("<div class='card mt-3 ml-1 mr-1'></div>");
        
        var card_body = $("<div class='card-body'></div>");
        var body_button = $("<button class='btn btn-block btn-link zebra-list-button pl-2 pr-0' type='button' data-toggle='collapse'" + " data-target='#" + this.tagID + "'></button>");
        var button_contain = $("<div class='container p-0'></div>");
        var contain_row = $("<div class='row'></div>");

        var row_col3 = $("<div class='col-3 text-center m-0' style='font-size:x-large;'></div>").html(this.year);
        var row_col9 = $("<div class='col-9 text-left' style='font-size:small;'>").html("结余:" + this.remain + "<br>" + "收入:" + this.income + "|" + "支出:" + this.expense)

        var card_collapse = $("<div class='collapse' style='background-color: whitesmoke;' id='" + this.tagID + "'></div>");

        contain_row.append(row_col3, row_col9);
        button_contain.append(contain_row);
        body_button.append(button_contain);
        card_body.append(body_button);

        // collapse content
        var tempmonth = new billList(this.dataList,this.tagID);
        card_collapse.append(tempmonth.create(month));

        year_card.append(card_body, card_collapse);
        
        // console.log("year_card");
        // console.log(year_card);

        return year_card;
    }
}
class month {
    constructor(data, tagID) {
        this.month = data.token;
        this.income = data.income;
        this.expense = data.expense;
        this.remain = data.remain;
        this.dataList = data.list;
        this.tagID = tagID;
    }
    create() {
        // alert("month");
        var month_card = $("<div class='card mt-3 ml-1 mr-1'></div>");

        var card_body = $("<div class='card-body'></div>");
        var body_button = $("<button class='btn btn-block btn-link zebra-list-button pl-2 pr-0' type='button' data-toggle='collapse'" + " data-target='#"+this.tagID + "'></button>");
        var button_contain = $("<div class='container p-0'></div>");
        var contain_row = $("<div class='row contain_row'></div>");

        var row_col3 = $("<div class='col-3 text-center m-0 dropdown-date' style='font-size: large;'></div>").html(parseInt(this.month.slice(5), 10)+"月");
        var row_col9 = $("<div class='col-9 text-left dropdown-total' style='font-size: small;'>").html("结余:" + this.remain + "<br>" + "收入:" + this.income + "|" + "支出:" + this.expense)

        var card_collapse = $("<div class='collapse' style='background-color: whitesmoke;' id='" + this.tagID + "'></div>");

        contain_row.append(row_col3, row_col9);
        button_contain.append(contain_row);
        body_button.append(button_contain);
        card_body.append(body_button);

        var bills = [];
        this.dataList.forEach(element => {
            element.list.forEach(
                e => {
                    bills.push(e);
                }
            );
        });
        
        var last_layer_bills = new billList(bills,this.tagID);
        card_collapse.append(last_layer_bills.create(card));

        month_card.append(card_body, card_collapse);
        return month_card;
    }
}

function updateAllListByTimeLine(jqueryContainer,data){
    // alert("update", typeof(data));

    $('#account-type').html((data.account)?data.account:"账户:所有账户");
    $('#account-income').html(data.income+"<br>"+"收入");
    $('#account-remain').html(data.remain+"<br>"+"结余");
    $('#account-expense').html(data.expense+"<br>"+"支出");


    // console.log("data");
    // console.log(data);
    
    var listContainer = new billList(data.list,"Bill");
    jqueryContainer.append(listContainer.create(year));
}
