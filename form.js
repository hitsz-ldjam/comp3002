a = {
    "token": "year-month-day",
    "income": 200,
    "expense": 400,
    "remain": -200,
    "list": [{
        "token": "2020",
        "income": 200,
        "expense": 400,
        "remain": -200,
        "list": [{
            "title": "9",
            "income": 200,
            "expense": 400,
            "remain": -200,
            "list": [{
                "title": "28",
                "income": 200,
                "expense": 400,
                "remain": -200,
                "list": [{
                    // this is a bill
                }]
            }]
        }]
    }]
}

class singleList {
    constructor(token, income, expense, remain) {
        this.token = token;
        this.income = income;
        this.expense = expense;
        this.remain = remain;
        this.list = [];
    }
}
let viewByTime = new singleList("year-month-day");
viewByTime.income = 100;
viewByTime.expense = 200;
viewByTime.remain = -100;
viewByTime.list.push()
console.log(viewByTime);