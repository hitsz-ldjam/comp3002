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
<<<<<<< HEAD
class oneArray {
=======
class OneArray {
>>>>>>> 9f393a7a99f369d6697d78b7c52201a2bf37806c
=======
class OneArray {
>>>>>>> b41645c840d959b4d6698b5da40d556de80113a6
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
<<<<<<< HEAD
class singleList {
=======
class SingleList {
>>>>>>> 9f393a7a99f369d6697d78b7c52201a2bf37806c
=======
class SingleList {
>>>>>>> b41645c840d959b4d6698b5da40d556de80113a6
    constructor(token) {
        this.token = token;
        this.income = 0;
        this.expense = 0;
        this.remain = 0;
        this.list = [];
    }
}
