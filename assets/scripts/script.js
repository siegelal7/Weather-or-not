$(document).ready(function () {
  // establish all/most of the variables i'm gonna need for DOM manipulation
  var input = $("#input");
  var submit = $(".submit");
  // var apikey = "a573ba9eea9e8c716df06e0ed9a541d6";

  var searchHistory = [];
  var temp = $("#temp");
  var humidity = $("#humidity");
  var wind = $("#wind");
  var uv = $("#uv");
  var today = $("#city-date");
  var momentDate = moment().format("M/D/YYYY");
  var tmrw = moment().add(1, "days").format("M/D/YYYY");
  var TwoDays = moment().add(2, "days").format("M/D/YYYY");
  var ThreeDays = moment().add(3, "days").format("M/D/YYYY");
  var FourDays = moment().add(4, "days").format("M/D/YYYY");
  var FiveDays = moment().add(5, "days").format("M/D/YYYY");
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
  var dayOneIcon = $("#day-one-icon");
  var dayTwoIcon = $("#day-two-icon");
  var dayThreeIcon = $("#day-three-icon");
  var dayFourIcon = $("#day-four-icon");
  var dayFiveIcon = $("#day-five-icon");
  var historyList = $(".history");

  //calling the below function to load the list of previously searched cities
  buildHistoryList();

  //add the search to the history list by setting the empty array initialized above equal to the localstorage values if they're valid
  function buildHistoryList() {
    historyList.empty();
    var history = JSON.parse(localStorage.getItem("city"));
    if (history !== null) {
      searchHistory = history;
    }
    for (i = 0; i < searchHistory.length; i++) {
      historyList.append(
        $("<li class='list-group-item'>").text(searchHistory[i])
      );
    }
  }

  //massive function (which could easily have been refactored to more than 1 function) to make api call and populate the elements on the page with results
  function searchAndPopulate(val) {
    var urlQuery = `https://api.openweathermap.org/data/2.5/weather?q=${val}&appid=a573ba9eea9e8c716df06e0ed9a541d6&units=imperial`;

    if (searchHistory.includes(val) === false) {
      searchHistory.push(val);
      if (val !== null && val !== "" && val !== " ") {
        localStorage.setItem("city", JSON.stringify(searchHistory));
      }
    }

    //basic weather info

    $.ajax({
      url: urlQuery,
      method: "GET",
    }).then(function (response) {
      var todayIconUrl = `https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`;
      temp.text(`Temperature: ${response.main.temp}˚F`);
      wind.text(`Wind Speed: ${response.wind.speed} MPH`);
      var todayIcon = $("<img>");
      todayIcon.attr("src", todayIconUrl);
      todayIcon.attr("style", "height:70%");
      today.text(`${response.name} (${momentDate})`);

      today.append(todayIcon);
      humidity.text(`${response.main.humidity}%`);

      var lon = response.coord.lon;
      var lat = response.coord.lat;

      var nextUrl2 = `https://api.openweathermap.org/data/2.5/onecall?exclude=hourly,minutely&appid=a573ba9eea9e8c716df06e0ed9a541d6&lat=${lat}&lon=${lon}&units=imperial`;
      // another api call inside the first one to obtain forecast and uvi
      $.ajax({
        url: nextUrl2,
        method: "GET",
      }).then(function (resp) {
        var uvString = "";
        //these variables are the weather icons api call sites for the various days in forecast
        var iconOne = `https://openweathermap.org/img/wn/${resp.daily[0].weather[0].icon}@2x.png`;
        var iconTwo = `https://openweathermap.org/img/wn/${resp.daily[1].weather[0].icon}@2x.png`;
        var iconThree = `https://openweathermap.org/img/wn/${resp.daily[2].weather[0].icon}@2x.png`;
        var iconFour = `https://openweathermap.org/img/wn/${resp.daily[3].weather[0].icon}@2x.png`;
        var iconFive = `https://openweathermap.org/img/wn/${resp.daily[4].weather[0].icon}@2x.png`;
        uvString = uvString + resp.current.uvi;
        uv.text(`UV Index: ${uvString}`);
        //this if/else if chain will set the color for the uv index based on how high it is
        if (parseFloat(uvString) < 3) {
          uv.attr("style", "background:green");
        } else if (parseFloat(uvString) < 6) {
          uv.attr("style", "background:yellow");
        } else if (parseFloat(uvString) < 8) {
          uv.attr("style", "background:orange");
        } else if (parseFloat(uvString) < 11) {
          uv.attr("style", "background:red");
        } else {
          uv.attr("style", "background:purple; color:white");
        }
        //I could've written a for loop here, but because I hard coded my html this is honestly just easier right now...
        //TODO: finish this loop to simplify below
        // for (i = 1; i < 6; i++) {
        //   var dayTemp = $("#day-" + i + "-temp");
        //   dayTemp.text(`Temp: ${resp.daily[i].temp.day}˚F`);
        //   var dayHum = $(`#day-${i}-humidity`);
        //   dayHum.text(`Humidity: ${resp.daily[i].humidity}%`);
        // }
        dayOneTemp.text(`Temp: ${resp.daily[1].temp.day}˚F`);
        dayOneHum.text(`Humidity: ${resp.daily[1].humidity}%`);
        dayTwoTemp.text(`Temp: ${resp.daily[2].temp.day}˚F`);
        dayTwoHum.text(`Humidity: ${resp.daily[2].humidity}%`);
        dayThreeTemp.text(`Temp: ${resp.daily[3].temp.day}˚F`);
        dayThreeHum.text(`Humidity: ${resp.daily[3].humidity}%`);
        dayFourTemp.text(`Temp: ${resp.daily[4].temp.day}˚F`);
        dayFourHum.text(`Humidity: ${resp.daily[4].humidity}%`);
        dayFiveTemp.text(`Temp: ${resp.daily[5].temp.day}˚F`);
        dayFiveHum.text(`Humidity: ${resp.daily[5].humidity}%`);
        dayOneDate.text(tmrw);
        dayTwoDate.text(TwoDays);
        dayThreeDate.text(ThreeDays);
        dayFourDate.text(FourDays);
        dayFiveDate.text(FiveDays);
        dayOneIcon.attr("style", "display:block");
        dayTwoIcon.attr("style", "display:block");
        dayThreeIcon.attr("style", "display:block");
        dayFourIcon.attr("style", "display:block");
        dayFiveIcon.attr("style", "display:block");
        dayOneIcon.attr("src", iconOne);
        dayTwoIcon.attr("src", iconTwo);
        dayThreeIcon.attr("src", iconThree);
        dayFourIcon.attr("src", iconFour);
        dayFiveIcon.attr("src", iconFive);
      });
      //calling this function again to add the new value searched to history
      buildHistoryList();
    });
  }
  //event listener for the submit button- calls that function above and captures the value entered by the  user
  submit.on("click", function (event) {
    event.preventDefault();
    input.text("");
    //   console.log("test");
    var val = $(this).siblings("input").val();
    searchAndPopulate(val);
    // var urlQuery = `https://api.openweathermap.org/data/2.5/weather?q=${val}&appid=a573ba9eea9e8c716df06e0ed9a541d6&units=imperial`;
  });
  //finally, here's an event listener for the history list- the 2nd arg is a "selector" which delegates which specific descendant item we click on
  historyList.on("click", ".list-group-item", function () {
    searchAndPopulate($(this).text());
  });
});
