let apiKey = "b524420f7abffe686b3afa379ce7504c";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather";

function formatTime(value) {
  if (value < 10) {
    return "0" + value;
  }
  return value;
}

let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];
let hour = formatTime(now.getHours());
let minutes = formatTime(now.getMinutes());
let display = `${day} ${hour}:${minutes}`;

let realDate = document.querySelector("#date-real");
realDate.innerHTML = display;

function celsiusToFahrenheit(value) {
  return Math.round(value * (9 / 5) + 32);
}

function fahrenheitToCelsius(value) {
  return Math.round((value - 32) * (5 / 9));
}

function convertTemperature() {
  let units = document.querySelectorAll(".weather-unit");
  let values = document.querySelectorAll(".weather-value");
  if (units[0].innerHTML === "C") {
    values.forEach(
      (value) => (value.innerHTML = celsiusToFahrenheit(value.innerHTML))
    );
    units.forEach((unit) => (unit.innerHTML = "F"));
  } else {
    values.forEach(
      (value) => (value.innerHTML = fahrenheitToCelsius(value.innerHTML))
    );
    units.forEach((unit) => (unit.innerHTML = "C"));
  }
}

let weatherUnitToggle = document.querySelector("#weather-unit-toggle a");
weatherUnitToggle.addEventListener("click", convertTemperature);
function realTemperature(response) {
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name;
  let h3 = document.querySelectorAll(".weather-value");
  h3[0].innerHTML= Math.round(response.data.main.temp);
  h3[1].innerHTML= Math.round(response.data.main.feels_like);
}
function searchCity(event) {
  event.preventDefault();
  let input = document.querySelector("#city-input");
  let unit = "imperial";
  let currentUnit=document.querySelector(".weather-unit");
  if ( currentUnit.innerHTML==="C"){
     unit = "metric";
  }
  axios
    .get(`${apiUrl}?q=${input.value}&appid=${apiKey}&units=${unit}`)
    .then(realTemperature);
}

let form = document.querySelector("#search-engine");
form.addEventListener("submit", searchCity);
function getPositionWeather(position) {
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let unit = "imperial";
  let currentUnit=document.querySelector(".weather-unit");
  if ( currentUnit.innerHTML==="C"){
     unit = "metric";
  }

  axios
    .get(`${apiUrl}?appid=${apiKey}&units=${unit}&lat=${lat}&lon=${lon}`)
    .then(realTemperature);
}
function searchLocation(){
  navigator.geolocation.getCurrentPosition(getPositionWeather);

}
let button= document.querySelector("button")
button.addEventListener("click", searchLocation)


