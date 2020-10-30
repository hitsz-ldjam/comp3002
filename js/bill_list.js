'use strict';


class billList {
    /**
     *@param {array} dataList      
     */
    constructor(dataList, tagID) {
        this.dataList = dataList;
        this.tagID = tagID +"1" ;
    }

    create(elementType) {
        var listContainer = $("<div class='container' "+"id='" + this.tagID + "'></div>");
        // this.dataList.forEach(element => {
        //     var cardtemplet = new card(element);
        //     listContainer.append(cardtemplet.createCard());
        // });
        // alert(typeof(this.dataList));
   
        for (var i = 0; i < this.dataList.length; i++) {
            var cardtemplet = new elementType(this.dataList[i], this.tagID + i.toString());
            // alert(listContainer[0]);
            listContainer.append(cardtemplet.create());

        };
        return listContainer;
    }
}
function iconSelector(mainCategory,mainCategories){
    switch(mainCategory){
        case mainCategories[0].name://food
            return "<svg t='1603899555393' class='icon' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='82284' width='40' height='40'><path d='M661.333333 896L597.333333 341.333333h95.146667L644.266667 147.626667 718.506667 128l53.333333 213.333333H938.666667l-64 554.666667h-213.333334M213.333333 469.333333h213.333334a128 128 0 0 1 128 128H85.333333a128 128 0 0 1 128-128m341.333334 298.666667a128 128 0 0 1-128 128H213.333333a128 128 0 0 1-128-128h469.333334M128 640h213.333333l64 64L469.333333 640h42.666667a42.666667 42.666667 0 0 1 42.666667 42.666667 42.666667 42.666667 0 0 1-42.666667 42.666666H128a42.666667 42.666667 0 0 1-42.666667-42.666666 42.666667 42.666667 0 0 1 42.666667-42.666667z' fill='#1296db' p-id='82285'></path></svg>"
        case mainCategories[2].name://trans
            return "<svg t='1603850240292' class='icon' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='20570' width='40' height='40'><path d='M213.333333 874.666667A149.333333 149.333333 0 0 1 64 725.333333 149.333333 149.333333 0 0 1 213.333333 576 149.333333 149.333333 0 0 1 362.666667 725.333333 149.333333 149.333333 0 0 1 213.333333 874.666667M213.333333 512a213.333333 213.333333 0 0 0-213.333333 213.333333 213.333333 213.333333 0 0 0 213.333333 213.333334 213.333333 213.333333 0 0 0 213.333334-213.333334 213.333333 213.333333 0 0 0-213.333334-213.333333m418.133334-85.333333H810.666667V349.866667h-136.533334l-82.773333-139.52c-12.373333-21.333333-36.693333-35.413333-62.293333-35.413334-20.053333 0-38.4 8.106667-51.2 21.333334L320 353.706667C306.773333 366.933333 298.666667 384 298.666667 405.333333c0 26.88 14.08 49.493333 36.266666 62.72L477.866667 554.666667v213.333333H554.666667v-277.333333l-96-70.4 98.986666-100.266667m253.013334 554.666667a149.333333 149.333333 0 0 1-149.333334-149.333334 149.333333 149.333333 0 0 1 149.333334-149.333333 149.333333 149.333333 0 0 1 149.333333 149.333333 149.333333 149.333333 0 0 1-149.333333 149.333334m0-362.666667a213.333333 213.333333 0 0 0-213.333334 213.333333 213.333333 213.333333 0 0 0 213.333334 213.333334 213.333333 213.333333 0 0 0 213.333333-213.333334 213.333333 213.333333 0 0 0-213.333333-213.333333m-128-307.2c42.666667 0 76.8-34.133333 76.8-76.8S725.333333 51.2 682.666667 51.2 605.866667 85.333333 605.866667 128 640 204.8 682.666667 204.8z' fill='#1296db' p-id='20571'></path></svg>";
        case mainCategories[1].name://shop
            return "<svg t='1603891563042' class='icon' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='81892' width='40' height='40'><path d='M725.333333 768a85.333333 85.333333 0 0 1 85.333334 85.333333 85.333333 85.333333 0 0 1-85.333334 85.333334 85.333333 85.333333 0 0 1-85.333333-85.333334c0-47.36 37.973333-85.333333 85.333333-85.333333M42.666667 85.333333h139.52l40.106666 85.333334H853.333333a42.666667 42.666667 0 0 1 42.666667 42.666666c0 7.253333-2.133333 14.506667-5.12 21.333334l-152.746667 276.053333c-14.506667 26.026667-42.666667 43.946667-74.666666 43.946667H345.6l-38.4 69.546666-1.28 5.12a10.666667 10.666667 0 0 0 10.666667 10.666667H810.666667v85.333333H298.666667a85.333333 85.333333 0 0 1-85.333334-85.333333c0-14.933333 3.84-29.013333 10.24-40.96l58.026667-104.533333L128 170.666667H42.666667V85.333333m256 682.666667a85.333333 85.333333 0 0 1 85.333333 85.333333 85.333333 85.333333 0 0 1-85.333333 85.333334 85.333333 85.333333 0 0 1-85.333334-85.333334c0-47.36 37.973333-85.333333 85.333334-85.333333m384-298.666667l118.613333-213.333333H261.973333l100.693334 213.333333H682.666667z' fill='#1296db' p-id='81893'></path></svg>";    
        default://other
            return "<svg t='1603891144446' class='icon' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='61919' width='40' height='40'><path d='M938.666667 641.706667c0 93.44-75.093333 168.96-167.68 168.96H253.013333C160.426667 810.666667 85.333333 735.146667 85.333333 641.706667c0-84.053333 61.013333-153.6 141.226667-166.4-1.28-5.973333-1.706667-11.946667-1.706667-18.346667 0-58.88 47.36-107.093333 106.24-107.093333 26.026667 0 50.346667 9.813333 68.693334 25.6 32.853333-74.666667 75.093333-143.36 193.706666-143.36 143.786667 0 211.626667 111.786667 211.626667 229.973333 0 4.693333 0 9.813333-0.426667 14.506667A168.533333 168.533333 0 0 1 938.666667 641.706667z' fill='#1296db' p-id='61920'></path></svg>";
    }
}
class card {
    constructor(data) {
        this.type = data.type;
        this.account = data.account;
        this.mainCategory = data.mainCategory;
        this.subCategory = data.subCategory;
        this.time =  data.time;
        this.amount = data.amount;
        this.tagID = data.id;
    }
    create() {
        // alert('hascreatedcard');
        /* <div class='card'>
            <div class='card-body'>
                <div class='card-text  align-items-center d-flex justify-content-between'>
                    <div class='bill-date  text-center p-0'>29日<br>10</div>
                    <div class='bill-catandtime col-6 d-flex'>
                        <div class='bill-icon pr-2'>
                        <svg t="1603616585637" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1262" 
                        width="32" height="32"><path d="M0 938.67h1024V1024H0zM979.31 810.67C962.98 630.44 844.38 479.4 682.13 416.05 676.6 326.9 602.52 256 512 256s-164.6 70.9-170.13 160.05C179.62 479.4 61.02 630.44 44.69 810.67H0V896H1024v-85.33h-44.69zM512 341.33c34.05 0 63.27 20.18 76.95 49.08C563.9 386.26 538.21 384 512 384s-51.9 2.26-76.95 6.42c13.68-28.91 42.9-49.09 76.95-49.09zM130.35 810.67C151.65 618.94 314.69 469.33 512 469.33s360.35 149.6 381.65 341.33h-763.3z" fill="#333333" p-id="1263"></path></svg>
                        </div>
                        <div class='cat-time-data'>餐饮>三餐<br>17:56</div>   
                    </div>
                    <div class='bill-amount col-3  pt-4 pb-4 '><b>-57</b></div>
                </div>
            </div>
        </div> */
        var catandtime_icon = $("<div class='bill-icon'></div>").html(iconSelector(this.mainCategory,global.dataJson.mainCategories));
        // alert(catandtime_icon);
        var catandtime_data = $("<div class='cat-time-data'></div>").html(this.mainCategory + ">" + this.subCategory + "<br>" +"<small class='text-muted font-weight-light'>"+ DateUtils.parse(this.time).getHours()+":"
        +Math.round(DateUtils.parse(this.time).getMinutes()/10)+Math.round(DateUtils.parse(this.time).getMinutes()%10)+"</small>");
        var text_amount = $("<div class='bill-amount col-3  text-right'></div>").html("<b class='"+(this.type == BillType.income ? "text-success" : "text-danger")+"'>" + (this.type == BillType.income ? "+" : "-") + this.amount + "</b>");
        var text_catandtime = $("<div class='bill-catandtime col-6 d-flex align-items-center'></div>");
        var text_date = $("<div class='bill-date text-center'></div>").html("<strong>"+DateUtils.parse(this.time).getDate() +"</strong>"+ "<small>日</small><br>" + "<small class='text-muted' hidden>"+(DateUtils.parse(this.time).getMonth() + 1)+"月</small>");
        var body_text = $("<div class='card-text  align-items-center d-flex justify-content-between'></div>");
        var card_body = $("<div class='card-body'></div>");
        var bill_card = $("<div class='card'" + "id='" + this.tagID + "'></div>");

        text_catandtime.append(catandtime_icon, catandtime_data);
        body_text.append(text_date, text_catandtime,text_amount);
        card_body.append(body_text);
        bill_card.append(card_body);
        return bill_card;
    }


}

function updateCard(container,bills) {
    var listContainer = new billList(bills,1);
    container.append(listContainer.create(card));
}
function updateAccountList(container){

    global.dataJson.accounts.forEach(element => {

        var li=$("<li><a class='scroll-link' href='bill_waters.html?account="+element.name+"'>"+element.name+"</a></li>");
        container.append(li);
    });
}
$(function(){
    $(".card").on("click",function(){
        this
    })
})

