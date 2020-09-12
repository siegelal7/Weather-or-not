var input = $("#search-prompt");
var submit = $(".submit");
var apikey = "a573ba9eea9e8c716df06e0ed9a541d6";
var searchHistory = [];

submit.on("click", function (event) {
  event.preventDefault();
  //   console.log("test");
  var val = $(this).siblings("input").val();
  console.log(val);
  localStorage.setItem("city", val);
});
