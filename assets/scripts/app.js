const iconElement = document.querySelector(".weather-icon");
const locationIcon = document.querySelector(".location-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");

var input = document.getElementById("search");
let city = "";
let latitude = 0.0;
let longitude = 0.0;

input.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();

    city = input.value;
    getSearchWeather(city);
    console.log(city);
  }
});
const weather = {};

weather.temperature = {
  unit: "celsius",
};

const KELVIN = 273;

// api web address
const baseURL = "http://api.openweathermap.org/data/2.5/";
// default key
const apiKey = "9bcbcb339316b2cca5f92d48f4227f71"

const key = "9bcbcb339316b2cca5f92d48f4227f71";
if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
  notificationElement.style.display = "block";
  notificationElement.innerHTML = "<p>Browser doesn't Support Geolocation</p>";
}

function setPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  getWeather(latitude, longitude);
}

locationIcon.addEventListener("click", function (event) {
  console.log("hey");
  getWeather(latitude, longitude);
});
