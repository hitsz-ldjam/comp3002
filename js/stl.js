
var a  =1 ;
function myFunction() {
  a = a + 1;
  console.log(a);

  if (a % 2 == 1) {
    document.getElementById("demo").innerHTML = "I'm back";
  } else {
    document.getElementById("demo").innerHTML = "gogogo";
  }
}

function print(a) {
    $(function(){
      $("#demo").innerHTML += a;
    })
}

function println(a) {
  $(function(){
      $("#demo").innerHTML += a;
      $("#demo").innerHTML += "<br/>";
  });
}

function printDate() {
  $(function(){
    $("#button_2").click(function(){
      $("#demo").append(Date());
      $("#demo").append("<br/>");
    });
  })
}

function printlna() {
  $(function(){
    $("#button_1").click(function(){
      $("#demo").append(a);
      $("#demo").append("<br/>");
      a++;
    });
  })
}
