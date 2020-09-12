var input = $("#search-prompt");
var submit = $(".submit");
// var apikey = "a573ba9eea9e8c716df06e0ed9a541d6";
var searchHistory = [];
var temp = $("#temp");
var humidity = $("#humidity");
var wind = $("#wind");
var uv = $("#uv");
var today = $("#city-date");
var momentDate = moment().format("M/D/YYYY");
// var urlQuery;
submit.on("click", function (event) {
  event.preventDefault();
  //   console.log("test");
  var val = $(this).siblings("input").val();
  var urlQuery = `https://api.openweathermap.org/data/2.5/weather?q=${val}&appid=a573ba9eea9e8c716df06e0ed9a541d6&units=imperial`;
  var urlQueryTwo = `https://api.openweathermap.org/data/2.5/forecast?q=${val}&appid=a573ba9eea9e8c716df06e0ed9a541d6&units=imperial`;
  console.log(val);
  storeObject = {
    city: val,
  };
  searchHistory.push(storeObject);
  localStorage.setItem("city", JSON.stringify(searchHistory));
  //basic weather info
  $.ajax({
    url: urlQuery,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    temp.text(`Temperature: ${response.main.temp}˚`);
    wind.text(`Wind Speed: ${response.wind.speed} MPH`);
    today.text(`${val} ${momentDate}`);
    humidity.text(`${response.main.humidity}%`);
  });

  $.ajax({
    url: urlQueryTwo,
    method: "GET",
  }).then(function (resp) {
    console.log(resp);
  });
});

// function getWeather(val) {
//   $.ajax({
//     url: urlQuery,
//     method: "GET",
//   }).then(function (response) {
//     console.log(response);
//   });
// }

// var saveObject = {
//     //finds the value of each of the sibling elements in the generated html-set them as values in object to push to array then push to localStorage
//     time: $(this).siblings("div").text(),
//     task: $(this).siblings("textarea").val(),
//   };
//   wholeList.push(saveObject);
//   localStorage.setItem("todoList", JSON.stringify(wholeList));
