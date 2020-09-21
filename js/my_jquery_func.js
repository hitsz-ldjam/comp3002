// <script src="my_jquery_func.js"></script>

function deal_click(){
    $(function () {
        $("#button_5").click(function () {
          $("#demo").show();
        })
      });
}

function deal_hide_show(){
  $(function () {
      $("#button_6").click(function () {
        $("#demo").toggle(1000,function(){
          alert("Toggle() function has finished!");
        });
      })
    });
}