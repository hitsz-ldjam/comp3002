'use strict';


class billList {
    /**
     *@param {array} dataList      商家类
     */
    constructor(dataList, tagID) {
        this.dataList = dataList;
        this.tagID = tagID;
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
function iconSelector(mainCategory){
    var mainCatList = ["食物", "出行", "琐碎"];
    switch(mainCategory){
        case mainCatList[0]://food
            return "<svg t='1603848557726' class='icon' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='1254' width='32' height='32'><path d='M661.333333 896L597.333333 341.333333h95.146667L644.266667 147.626667 718.506667 128l53.333333 213.333333H938.666667l-64 554.666667h-213.333334M213.333333 469.333333h213.333334a128 128 0 0 1 128 128H85.333333a128 128 0 0 1 128-128m341.333334 298.666667a128 128 0 0 1-128 128H213.333333a128 128 0 0 1-128-128h469.333334M128 640h213.333333l64 64L469.333333 640h42.666667a42.666667 42.666667 0 0 1 42.666667 42.666667 42.666667 42.666667 0 0 1-42.666667 42.666666H128a42.666667 42.666667 0 0 1-42.666667-42.666666 42.666667 42.666667 0 0 1 42.666667-42.666667z' fill='#7dc5eb' p-id='1255'></path></svg>"
        case mainCatList[1]://trans
            return "<svg t='1603850240292' class='icon' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='20570' width='32' height='32'><path d='M213.333333 874.666667A149.333333 149.333333 0 0 1 64 725.333333 149.333333 149.333333 0 0 1 213.333333 576 149.333333 149.333333 0 0 1 362.666667 725.333333 149.333333 149.333333 0 0 1 213.333333 874.666667M213.333333 512a213.333333 213.333333 0 0 0-213.333333 213.333333 213.333333 213.333333 0 0 0 213.333333 213.333334 213.333333 213.333333 0 0 0 213.333334-213.333334 213.333333 213.333333 0 0 0-213.333334-213.333333m418.133334-85.333333H810.666667V349.866667h-136.533334l-82.773333-139.52c-12.373333-21.333333-36.693333-35.413333-62.293333-35.413334-20.053333 0-38.4 8.106667-51.2 21.333334L320 353.706667C306.773333 366.933333 298.666667 384 298.666667 405.333333c0 26.88 14.08 49.493333 36.266666 62.72L477.866667 554.666667v213.333333H554.666667v-277.333333l-96-70.4 98.986666-100.266667m253.013334 554.666667a149.333333 149.333333 0 0 1-149.333334-149.333334 149.333333 149.333333 0 0 1 149.333334-149.333333 149.333333 149.333333 0 0 1 149.333333 149.333333 149.333333 149.333333 0 0 1-149.333333 149.333334m0-362.666667a213.333333 213.333333 0 0 0-213.333334 213.333333 213.333333 213.333333 0 0 0 213.333334 213.333334 213.333333 213.333333 0 0 0 213.333333-213.333334 213.333333 213.333333 0 0 0-213.333333-213.333333m-128-307.2c42.666667 0 76.8-34.133333 76.8-76.8S725.333333 51.2 682.666667 51.2 605.866667 85.333333 605.866667 128 640 204.8 682.666667 204.8z' fill='#1296db' p-id='20571'></path></svg>";
        case mainCatList[2]://suoshi
            return "<svg t='1603850240292' class='icon' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='20570' width='32' height='32'><path d='M213.333333 874.666667A149.333333 149.333333 0 0 1 64 725.333333 149.333333 149.333333 0 0 1 213.333333 576 149.333333 149.333333 0 0 1 362.666667 725.333333 149.333333 149.333333 0 0 1 213.333333 874.666667M213.333333 512a213.333333 213.333333 0 0 0-213.333333 213.333333 213.333333 213.333333 0 0 0 213.333333 213.333334 213.333333 213.333333 0 0 0 213.333334-213.333334 213.333333 213.333333 0 0 0-213.333334-213.333333m418.133334-85.333333H810.666667V349.866667h-136.533334l-82.773333-139.52c-12.373333-21.333333-36.693333-35.413333-62.293333-35.413334-20.053333 0-38.4 8.106667-51.2 21.333334L320 353.706667C306.773333 366.933333 298.666667 384 298.666667 405.333333c0 26.88 14.08 49.493333 36.266666 62.72L477.866667 554.666667v213.333333H554.666667v-277.333333l-96-70.4 98.986666-100.266667m253.013334 554.666667a149.333333 149.333333 0 0 1-149.333334-149.333334 149.333333 149.333333 0 0 1 149.333334-149.333333 149.333333 149.333333 0 0 1 149.333333 149.333333 149.333333 149.333333 0 0 1-149.333333 149.333334m0-362.666667a213.333333 213.333333 0 0 0-213.333334 213.333333 213.333333 213.333333 0 0 0 213.333334 213.333334 213.333333 213.333333 0 0 0 213.333333-213.333334 213.333333 213.333333 0 0 0-213.333333-213.333333m-128-307.2c42.666667 0 76.8-34.133333 76.8-76.8S725.333333 51.2 682.666667 51.2 605.866667 85.333333 605.866667 128 640 204.8 682.666667 204.8z' fill='#1296db' p-id='20571'></path></svg>";    
        default:
            return null;
    }
}
class card {
    constructor(data, tagID) {
        this.type = data.type;
        this.account = data.account;
        this.mainCategory = data.mainCategory;
        this.subCategory = data.subCategory;
        this.time = new Date(data.time);
        this.amount = data.amount;
        this.tagID = tagID;
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
        var catandtime_icon = $("<div class='bill-icon pr-2'></div>").html(iconSelector(this.mainCategory));
        // alert(catandtime_icon);
        var catandtime_data = $("<div class='cat-time-data'></div>").html(this.mainCategory + ">" + this.subCategory + "<br>" + this.time.getHours()+":"+this.time.getMinutes());
        var text_amount = $("<div class='bill-amount col-3  text-right'></div>").html("<b>" + (this.type == BillType.income ? "+" : "-") + this.amount + "</b>");
        var text_catandtime = $("<div class='bill-catandtime col-6 d-flex'></div>");
        var text_date = $("<div class='bill-date w-15 text-center p-0'></div>").html("<strong>"+this.time.getDate() +"</strong>"+ "日<br>" + "<small class='text-muted'>"+(this.time.getMonth() + 1)+"月</small>");
        var body_text = $("<div class='card-text  align-items-center d-flex justify-content-between'></div>");
        var card_body = $("<div class='card-body'></div>");
        var bill_card = $("<div class='card ml-2'" + "id='" + this.tagID + "'></div>");

        text_catandtime.append(catandtime_icon, catandtime_data);
        body_text.append(text_date, text_catandtime,text_amount);
        card_body.append(body_text);
        bill_card.append(card_body);

        return bill_card;


    }


}

function updateCard(container,data) {
    var listContainer = new billList(data,1);
    container.append(listContainer.create(card));
}