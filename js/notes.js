'use strict';
function Get_bill_input(){
    $("#submit2").click(function(){
        // 这里添加json代码
        let category = $("#kind").val();
        let time = $("#time").val();
        let money = $("#money").val();
        console.log(category);
        console.log(time);
        console.log(money);
    })
    
}