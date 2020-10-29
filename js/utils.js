"use strict";

class BillType {
    static get income() {
        return 1;
    }
    static get expense() {
        return 2;
    }
}

<<<<<<< HEAD
class oneArray {
=======
class OneArray {
>>>>>>> 9f393a7a99f369d6697d78b7c52201a2bf37806c
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

<<<<<<< HEAD
class singleList {
=======
class SingleList {
>>>>>>> 9f393a7a99f369d6697d78b7c52201a2bf37806c
    constructor(token) {
        this.token = token;
        this.income = 0;
        this.expense = 0;
        this.remain = 0;
        this.list = [];
    }
}
