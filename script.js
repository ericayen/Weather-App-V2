let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tueday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
function addZero(time) {
  if (time < 10) {
    time = "0" + time;
  }
  return time;
}
let day = days[now.getDay()];
let hour = addZero(now.getHours());
let minutes = addZero(now.getMinutes());
let dateFormat = `${day} ${hour}:${minutes}`;

function replaceText(event) {
  event.preventDefault();
  let searchDate = document.querySelector(".search-date");
  searchDate.innerHTML = `${dateFormat}`;
}

let buttonClick = document.querySelector("#search-button");
buttonClick.addEventListener("click", replaceText);

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let high = Math.round(response.data.main.temp_max);
  let low = Math.round(response.data.main.temp_min);
  let cityName = response.data.name;
  let windSpeed = Math.round(response.data.wind.speed);
  let weatherDescription = response.data.weather[0].description;
  let currentTemp = document.querySelector("#deg-temp");
  let highTemp = document.querySelector("#high-temp");
  let lowTemp = document.querySelector("#low-temp");
  let city = document.querySelector("#city");
  let wind = document.querySelector("#speed");
  let weather = document.querySelector(".weather-description");
  let icon = document.querySelector(".weather-emoji");
  celciusTemp = response.data.main.temp;
  currentTemp.innerHTML = `${temperature}`;
  highTemp.innerHTML = `${high}°  `;
  lowTemp.innerHTML = `${low}°`;
  city.innerHTML = `${cityName}`;
  wind.innerHTML = `Wind speed: ${windSpeed}km/h`;
  weather.innerHTML = `${weatherDescription}`;
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function geoPosition(response) {
  let longitude = response.coords.longitude;
  let latitude = response.coords.latitude;
  let apiKey = "99155108661d7dd4503fb67dfa97d58f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
navigator.geolocation.getCurrentPosition(geoPosition);

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(geoPosition);
}

let currentLocation = document.querySelector("#location-button");
currentLocation.addEventListener("click", getPosition);

function citySearch(response) {
  let city = document.getElementById("search-bar").value;
  city = city.toLowerCase();
  let apiKey = "99155108661d7dd4503fb67dfa97d58f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

let cityInput = document.querySelector("#search-bar");
cityInput.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    document.querySelector("#search-button").click();
  }
});

let searchLocation = document.querySelector("#search-button");
searchLocation.addEventListener("click", citySearch);

function showFahrenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#deg-temp");
  celciusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemp = (celciusTemp * 9) / 5 + 32;
  temperature.innerHTML = Math.round(fahrenheitTemp);
}

function showCelcius(event) {
  event.preventDefault();
  let temperature = document.querySelector("#deg-temp");
  celciusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperature.innerHTML = Math.round(celciusTemp);
}

let celciusTemp = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheit);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", showCelcius);
