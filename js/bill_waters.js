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
    constructor(data, tagID) { //父元素ID
        this.year = data.token;
        this.income = data.income;
        this.expense = data.expense;
        this.remain = data.remain;
        this.dataList = data.list;
        this.tagID = tagID;
    }
    create(faContainer) {

        var year_card = $("<div class='card mt-3 ml-1 zebra'></div>");

        var card_body = $("<div class='card-body zebra'></div>");
        var body_button = $("<button class='btn btn-block zebra pl-2 pr-0 ' type='button' data-toggle='collapse'" + " data-target='#" + this.tagID + "'></button>");
        var button_row = $("<div class='row d-flex zebra'></div>");

        var row_col3 = $("<div class='col-3 text-center m-0 p-0 list-year'></div>").html(this.year);
        var row_col9 = $("<div class='col-auto text-left p-0 list-year-total'></div>").html("结余:" + this.remain + "<br>" + "收入:" + this.income + "|" + "支出:" + this.expense)

        var card_collapse = $("<div class='collapse' style='background-color: whitesmoke;' id='" + this.tagID + "'></div>");

        button_row.append(row_col3, row_col9);
        body_button.append(button_row);
        card_body.append(body_button);

        // collapse content
        // var tempmonth = new billList(this.dataList, this.tagID);
        // card_collapse.append(tempmonth.create(month));
        updateElementListIn(card_collapse, this.dataList, month);

        year_card.append(card_body, card_collapse);

        faContainer.append(year_card);
        // return year_card;
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
    create(faContainer) {
        // alert("month");
        var month_card = $("<div class='card zebra mt-1 ml-1'></div>");

        var card_body = $("<div class='card-body zebra'></div>");
        var body_button = $("<button class='btn btn-block btn-link zebra pl-2 pr-0' type='button' data-toggle='collapse'" + " data-target='#" + this.tagID + "'></button>");
        var button_contain = $("<div class='container'></div>");
        var contain_row = $("<div class='row zebra'></div>");

        var row_col3 = $("<div class='col-3 text-center m-0 list-month'></div>").html(parseInt(this.month.slice(5), 10) + "月");
        var row_col9 = $("<div class='col-9 text-left list-month-total'></div>").html("结余:" + this.remain + "<br>" + "收入:" + this.income + "|" + "支出:" + this.expense)

        var card_collapse = $("<div class='collapse pl-1' style='background-color: whitesmoke;' id='" + this.tagID + "'></div>");

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

        // var last_layer_bills = new billList(bills, this.tagID);
        // card_collapse.append(last_layer_bills.create(card));
        updateElementListIn(card_collapse, bills, card);


        month_card.append(card_body, card_collapse);

        faContainer.append(month_card);
        // return month_card;
    }
}

function updateAllListByTimeLineWithAccount(jqueryContainer, bills = global.dataJson.bills, ob) {
    // alert("update", typeof(data));
    var after_filter = viewByTimeLine(billFilter(bills, ob));
    console.log(after_filter);
    if (ob.account == null || ob.account[0] == null) {
        $('#account-type').html("账户:" + "所有账户");
    } else {
        $('#account-type').html("账户:" + ob.account[0]);
    }
    $('#account-income').html(after_filter.income + "<br>" + "收入");
    $('#account-remain').html(after_filter.remain + "<br>" + "结余");
    $('#account-expense').html(after_filter.expense + "<br>" + "支出");


    // console.log("data");
    // console.log(data);

    updateElementListIn(jqueryContainer, after_filter.list, year);
}
/**
 * 
 * url 实例：
 *
 *  http://www.runoob.com/index.php?id=1&image=awesome.jpg
 *  调用 getQueryVariable("id") 返回 1。
 *
 *  调用 getQueryVariable("image") 返回 "awesome.jpg"。
 */
function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    // console.log("query = ", query);
    var ans = [];
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            var gbk = decodeURI(pair[1].replace("\+","%20").replace("\%3A",":"));//在提交表单时，浏览器url会将空格转为"+"，故解码时将其转换回来
            ans.push(gbk);
        }
    }
    if (ans.length == 0) {
        return null;
    } else {
        return ans;
    }
}

function rangeWrapper(start, end) {
    if (start == "" || end == ""||start==null||end==null) {
        return null;
    } else {
        return [start[0], end[0]];
    }
}
//复选框加全选逻辑
// $(function(){
//     $('.zebra-select-section>.zebra-select-all').on("click",function(){
//         // console.log($(this).children().prop("checked"));

//         if($(this).children().prop("checked")){
//             console.log($(this).siblings().children());
//             $(this).siblings().children().each(function(){
//                 // alert();
//                 $(this).prop("checked",false);
//             });   
//         }
//         else{
//             // console.log($(this).siblings().children().prop("checked"));
//             $(this).siblings().children().each(function(){
//                 // alert();
//                 $(this).prop("checked",true);
//             });   
//         }
//         // console.log($(this).siblings().children().prop("checked"));
//     })
//     $('.zebra-select-section>.zebra-select-option').on("click",function(){
//         var checked_num=$(this).parent().children('.zebra-select-option').children(':checked').length;
//         // console.log(checked_num);
//         var option_num=$(this).parent().children('.zebra-select-option').length;

//         // console.log(option_num);
//         if(checked_num==option_num){
//             $('.zebra-select-all').children().prop("checked",true);
//         }
//         else{
//             $('.zebra-select-all').children().prop("checked",false);
//         }
//         // console.log($('.zebra-select-all').children());
//     });
// })