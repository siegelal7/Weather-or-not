$(document).ready(function () {
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
  var dayOneTemp = $("#day-one-temp");
  var dayTwoTemp = $("#day-two-temp");
  var dayThreeTemp = $("#day-three-temp");
  var dayFourTemp = $("#day-four-temp");
  var dayFiveTemp = $("#day-five-temp");
  var dayOneHum = $("#day-one-humidity");
  var dayTwoHum = $("#day-two-humidity");
  var dayThreeHum = $("#day-three-humidity");
  var dayFourHum = $("#day-four-humidity");
  var dayFiveHum = $("#day-five-humidity");
  var dayOneDate = $("#day-one-date");
  var dayTwoDate = $("#day-two-date");
  var dayThreeDate = $("#day-three-date");
  var dayFourDate = $("#day-four-date");
  var dayFiveDate = $("#day-five-date");
  // var urlQueryTwo = `https://api.openweathermap.org/data/2.5/forecast?q=${val}&appid=a573ba9eea9e8c716df06e0ed9a541d6&units=imperial`;
  // $.ajax({
  //   url: urlQueryTwo,
  //   method: "GET",
  // }).then(function (resp) {
  //   console.log(resp);
  //   var lat = resp.coord.lat;
  //   var lon = resp.coord.lon;
  //   return lon, lat;
  // });
  // var urlQuery;
  submit.on("click", function (event) {
    event.preventDefault();
    //   console.log("test");
    var val = $(this).siblings("input").val();
    var urlQuery = `https://api.openweathermap.org/data/2.5/weather?q=${val}&appid=a573ba9eea9e8c716df06e0ed9a541d6&units=imperial`;

    var urlTwo = `https://api.openweathermap.org/data/2.5/forecast?q=${val}&appid=a573ba9eea9e8c716df06e0ed9a541d6&units=imperial`;
    // console.log(val);
    storeObject = {
      city: val,
    };
    searchHistory.push(storeObject);
    localStorage.setItem("city", JSON.stringify(searchHistory));
    //basic weather info
    var nextUrl = "";
    $.ajax({
      url: urlQuery,
      method: "GET",
    }).then(function (response) {
      // console.log(response);
      temp.text(`Temperature: ${response.main.temp}˚`);
      wind.text(`Wind Speed: ${response.wind.speed} MPH`);
      today.text(`${val} (${momentDate})`);
      humidity.text(`${response.main.humidity}%`);
      var lon = response.coord.lon;
      var lat = response.coord.lat;
      // console.log(lon);
      // console.log(lat);
      nextUrl =
        nextUrl +
        `http://api.openweathermap.org/data/2.5/uvi?appid=a573ba9eea9e8c716df06e0ed9a541d6&lat=${lat}&lon=${lon}`;
    });

    console.log(nextUrl);

    $.ajax({
      url: urlTwo,
      method: "GET",
    }).then(function (r) {
      console.log(r);
      dayOneTemp.text(r.list[3].main.temp);
      dayOneHum.text(r.list[3].main.humidity);
      dayTwoTemp.text(r.list[11].main.temp);
      dayTwoHum.text(r.list[11].main.humidity);
      dayThreeTemp.text(r.list[19].main.temp);
      dayThreeHum.text(r.list[19].main.humidity);
      dayFourTemp.text(r.list[27].main.temp);
      dayFourHum.text(r.list[27].main.humidity);
      dayFiveTemp.text(r.list[35].main.temp);
      dayFiveHum.text(r.list[35].main.humidity);
      dayOneDate.text(r.list[3].dt_txt.substring(0, 10));
      dayTwoDate.text(r.list[11].dt_txt.substring(0, 10));
      dayThreeDate.text(r.list[19].dt_txt.substring(0, 10));
      dayFourDate.text(r.list[27].dt_txt.substring(0, 10));
      dayFiveDate.text(r.list[35].dt_txt.substring(0, 10));
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
});
