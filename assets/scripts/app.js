// * api web address
// const baseURL = "http://api.openweathermap.org/data/2.5/";
// * default key
// const apiKey = "9bcbcb339316b2cca5f92d48f4227f71";
// const key = "9bcbcb339316b2cca5f92d48f4227f71";
var inputKey = document.getElementById("inputKey");
var apiKey = "9bcbcb339316b2cca5f92d48f4227f71";


console.log(currentDay);
var retrieveDate;
var forecastDates = [];
var currentDay = moment().format("MMMM Do YYYY");
var todayDate = document.getElementById("Date");
var todayInfo = document.getElementById("todayInfo");

var fiveForecastContainer = document.getElementById("fiveContent");
var forecastRow = document.getElementById("contentRow");
var createImg = document.getElementById("jumboIcon");
createImg.style.display = "none";


var todayTemp = document.getElementById("todayTemp");
var todayHumidity = document.getElementById("todayHumidity");
var todayWind = document.getElementById("todayWind");
var todayUV = document.getElementById("todayUV");


var JumboHeader = document.getElementById("jumbotronHeader");
var todayIcon = document.getElementById("TodayIconDisplay");

var searchHistory = document.getElementById("previousCitySearch");
var searchButton = document.getElementById("button-addon2");
var searchCity = document.getElementById("city");
var inputKey = document.getElementById("inputKey");

// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
})()


function makeDate() {
  for (i = 1; i < 6; i++) {
    retrieveDate = moment().add(i, "days").format("MM/DD/YY");
    console.log(retrieveDate);
  }
}

// previoius city search variable decloration
var prevCities;
if (localStorage.getItem("cities")) {
  prevCities = JSON.parse(localStorage.getItem("cities"));
} else {
  prevCities = [];
}

// todo search function
localStorage.clear();
createSearchHistory();

// icon URL http://openweathermap.org/img/wn/10d@2x.png
// ------------------------ retrieve weather data from API --------------------
function getUVindex(input1, input2) {
  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${input1}&lon=${input2}&appid=9bcbcb339316b2cca5f92d48f4227f71`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var UVindex = data.current.uvi;
      if (UVindex > 3 && UVindex <= 5) {
        todayUV.setAttribute("style", "color:green; ");
      } else if (UVindex > 5 && UVindex <= 7) {
        todayUV.setAttribute("style", "color:yellow; ");
      } else if (UVindex > 7 && UVindex <= 10) {
        todayUV.setAttribute("style", "color:red; ");
      } else if (UVindex > 10) {
        todayUV.setAttribute("style", "color:purple; ");
      } else {
        todayUV.setAttribute("style", "color:black; ");
      }
      todayUV.textContent = "UV index: " + UVindex;
      return UVindex;
    });
}

// todo pervious search list
// whenever side bar item clicked, value runs through getAPI
searchHistory.onclick = function(event) {
  console.log(event.target.value)

  inputKey.value = event.target.textContent
  getApi(inputKey.value)
  getApi5day(inputKey.value)
  searchHistory.innerHTML = ''
  createSearchHistory()
}  
// save input to side column and store within local storage
// function createSearchHistory() {
  //   for(i)
  // }
searchButton.addEventListener('click', getApi5day)
searchButton.addEventListener('click', getApi);
function createSearchHistory() {
  searchHistory.innerHTML = ''
  for(i=0; i< prevCities.length; i++) {
    var createButton = document.createElement('button')
    createButton.setAttribute('class', 'btn btn-outline-secondary btn-lg col-12')
    createButton.value = prevCities[i]
    createButton.textContent = createButton.value
    console.log(createButton.value)
    searchHistory.appendChild(createButton)
  }
}

function getApi(input) {
  input = inputKey.value;
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${inputKey.value}&appid=9bcbcb339316b2cca5f92d48f4227f71&units=imperial`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // --Save the input into the search column for future reference
      // console.log(`${inputKey.value} raw data: `)
      console.log(data);

      searchCity.textContent = inputKey.value;
      todayDate.textContent = currentDay;
      todayTemp.textContent = "Temperature: " + data.main.temp;
      todayHumidity.textContent = "Humidity: " + data.main.humidity + "%";
      todayWind.textContent = "Wind speed: " + data.wind.speed;
      var IconIndex = data.weather[0].icon;
      var todayIconSrc =
        "https://openweathermap.org/img/wn/" + IconIndex + "@2x.png";
      createImg.setAttribute("src", todayIconSrc);
      createImg.style.display = "initial";
      // todayIcon.setAttribute('src', todayIconSrc )
      var latitude = data.coord.lat;
      var longitude = data.coord.lon;

      prevCities.push(inputKey.value);
      console.log(prevCities);
      localStorage.setItem("cities", JSON.stringify(prevCities));
      getUVindex(latitude, longitude); // Take data from this call and implement it into another function.
      createSearchHistory();
      inputKey.value = "";
    });
}


function makeDate() {
  for (i = 1; i < 6; i++) {
    retrieveDate = moment().add(i, "days").format("MM/DD/YY");
    console.log(retrieveDate);
  }
}

function getApi5day(input) {
  input = inputKey.value;
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${input}&appid=9bcbcb339316b2cca5f92d48f4227f71&units=imperial`
  )
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      // console.log(`${inputKey.value} five day forecast`)
      console.log(data);
      // creates the next five dates from today
      var count = 0;
      for (i = 0; i < 5; i++) {
        count = count + 1;
        // console.log(count)
        retrieveDate = moment().add(count, "days").format("MM/DD/YY");
        // console.log(typeof retrieveDate)
        // console.log(retrieveDate);
        forecastDates.push(retrieveDate);
      }
      var arrayIndex = 0;
      forecastRow.innerHTML = "";
      // CREATE THE CONTENT BOXES FOR THE FIVE DAY FORECAST W/ INFORMATION.
      for (i = 0; i < 40; i += 8) {
        var fiveIcons = data.list[i].weather[0].icon;
        // console.log(fiveIcons)

        var createDate = document.createElement("h3");
        createDate.setAttribute(
          "class",
          "text-center border border-4 fivedayHeaders"
        );
        createDate.setAttribute("class", "text-center fivedayHeaders");
        createDate.textContent = forecastDates[arrayIndex];
        // console.log(createDate.textContent)
        var createDay = document.createElement("div");
        createDay.setAttribute(
          "class",
          "col border border-4 forecastBox rounded box oneTimeRemove"
        );
        var createIcon = document.createElement("img");
        var fiveIconSrc =
          "https://openweathermap.org/img/wn/" + fiveIcons + "@2x.png";
        createIcon.setAttribute("src", fiveIconSrc);
        var createTemp = document.createElement("p");
        createTemp.textContent =
          "Temperature: " + data.list[i].main.temp + " °F";
        // console.log(createTemp)
        var createHumidity = document.createElement("p");
        createHumidity.textContent =
          "Humidity: " + data.list[i].main.humidity + "%";
        // console.log(createHumidity)
        forecastRow.appendChild(createDay);
        createDay.appendChild(createDate);
        createDay.appendChild(createIcon);
        createDay.appendChild(createTemp);
        createDay.appendChild(createHumidity);
        arrayIndex++; // increment the index number to grab next date
      }
    });
}
