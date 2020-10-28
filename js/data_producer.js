/**
 * input:                     可以不输入参数或者输入部分参数。
 * output:                    对象数组
 * @param {int} n             生成几个记录
 * @param {list} accountList  账户类
 * @param {list} subFood      食物的子类
 * @param {list} subTrans     交通的子类
 * @param {list} subSuo       琐碎子类
 * @param {list} mainCatList  main包含上面的三个类
 * @param {list} memberList   成员类
 * @param {list} merList      商家类
 */

function produce(
    n = 1000,
    accountList = [
        "现金",
        "银行卡",
        "基金",
        "股票",
        "微信",
        "饭卡",
        "公交卡",
        "支付宝",
    ],
    subFood = [
        "早饭",
        "午饭",
        "晚饭",
        "聚餐",
        "请客",
        "大排档",
        "海底捞",
        "牛肉火锅",
        "咖啡",
        "牛奶",
        "奶茶",
    ],
    subTrans = [
        "地铁",
        "公交车",
        "出租车",
        "滴滴",
        "共享单车",
        "汽车油费",
        "飞机油费",
        "共享汽车",
    ],
    subSuo = ["电费", "水费", "邮费", "房租"],
    mainCatList = ["食物", "出行", "琐碎"],
    memberList = [
        "爸爸",
        "妈妈",
        "爷爷",
        "奶奶",
        "外公",
        "外婆",
        "弟弟",
        "妹妹",
        "儿子",
        "女儿",
    ],
    merList = [
        "711",
        "全家",
        "海底捞",
        "黄焖鸡",
        "大排档",
        "水饺",
        "建设局",
        "健身房",
    ]
) {
    var bills = [];
    for (var i = 0; i < n; i++) {
        var year = Math.floor(Math.random() * 10 + 2010);
        var month = Math.floor(Math.random() * 12 + 1);
        var day = Math.floor(Math.random() * 30 + 1);
        var hour = Math.floor(Math.random() * 24 + 0);
        var minu = Math.floor(Math.random() * 60 + 0);
        var sec = Math.floor(Math.random() * 60 + 0);
        var date = new Date();
        date.setFullYear(year, month, day);
        date.setHours(hour, minu, sec);
        var bill = {};
        bill.account =
            accountList[Math.floor(Math.random() * accountList.length)];
        bill.amount = Math.floor(Math.random() * 200);
        bill.type =
            Math.floor(Math.random() * 2) == 1
                ? BillType.income
                : BillType.expense;
        bill.flag = "";
        bill.mainCat =
            mainCatList[Math.floor(Math.random() * mainCatList.length)];

        if (bill.mainCat == "食物") {
            bill.subCat =
                subFood[Math.floor(Math.random() * subFood.length)];
        } else if (bill.mainCat == "出行") {
            bill.subCat =
                subTrans[Math.floor(Math.random() * subTrans.length)];
        } else if (bill.mainCat == "琐碎") {
            bill.subCat =
                subSuo[Math.floor(Math.random() * subSuo.length)];
        } else {
            bill.subCat = "没有定义";
        }

        bill.time = date;
        bill.member = memberList[Math.floor(Math.random() * memberList.length)];
        bill.merchant = merList[Math.floor(Math.random() * merList.length)];
        bill.item = merList[Math.floor(Math.random() * merList.length)];
        bills.push(bill);
    }
    bills.sort(function (bill1, bill2) {
        return bill1.time - bill2.time;
    });
    return bills;
}

