"use strict";

class BillType {
    static get income() {
        return 1;
    }
    static get expense() {
        return 2;
    }
}

class OneArray {
    static get account() {
        return "account";
    }
    static get mainCategory() {
        return "mainCategory";
    }
    static get subCategory() {
        return "subCategory";
    }
    static get member() {
        return "member";
    }
    static get merchant() {
        return "merchant";
    }
    static get item() {
        return "item";
    }
}

class SingleList {
    constructor(token) {
        this.token = token;
        this.income = 0;
        this.expense = 0;
        this.remain = 0;
        this.list = [];
    }
}

class ob {
    constructor(account = null,
        amount = null,
        type = null,
        flag = null,
        mainCategory = null,
        subCategory = null,
        time = null,
        member = null,
        merchant = null,
        item = null) 
        {
        this.account = this.judge(account);
        this.amount = this.judge(amount);
        this.type = (type==null||type[0]=="null")?null:Number(type[0]);
        this.flag = flag;
        this.mainCategory = this.judge(mainCategory);
        this.subCategory = this.judge(subCategory);
        this.time = this.judge(time);
        this.member = this.judge(member);
        this.merchant = this.judge(merchant);
        this.item = this.judge(item);
    };
    judge(params) {
        if(params==null||params.length==0){
            return null;
        }else{
            return params;
        }
    }

}