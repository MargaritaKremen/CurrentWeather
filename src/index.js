function geolocation(position) {
  let apiKey = "f3a4c7fd1572e38d1a0b0f724e0e0218";

  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showCity);
}
function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(geolocation);
}

function showCity(response) {
  let temperature = Math.round(response.data.main.temp);
  let tempC = document.querySelector(".fontC");
  tempC.innerHTML = temperature;
  let city = response.data.name;
  let h1 = document.querySelector(".fontHead");
  h1.innerHTML = `${city}`;
}
function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let weather = response.data.weather[0].description;
  console.log(weather);
  let tempC = document.querySelector(".fontC");
  tempC.innerHTML = temperature;
  return temperature;
}

function signUp(event) {
  event.preventDefault();
  let input = document.querySelector("#city-input");
  let h1 = document.querySelector(".fontHead");
  h1.innerHTML = `${input.value}`;

  let apiKey = "f3a4c7fd1572e38d1a0b0f724e0e0218";
  let units = "metric";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

let form = document.querySelector("form#form-input");
form.addEventListener("submit", signUp);
let btn = document.querySelector("#button1");
btn.addEventListener("click", getPosition);

function tempC(event) {
  event.preventDefault();
  var t = 25;
  let tempC = document.querySelector(".fontC");
  tempC.innerHTML = `${t}`;
}
let linkC = document.querySelector("#tempC");
linkC.addEventListener("click", tempC);

function tempF(event) {
  event.preventDefault();

  let tempF = document.querySelector(".fontC");
  tempF.innerHTML = Math.round((25 * 9) / 5 + 32);
}
let linkF = document.querySelector("#tempF");
linkF.addEventListener("click", tempF);

let date = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = date.getDay();
let minutes = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes(); // 0,1,2, 12
let hourses = (date.getHours() < 10 ? "0" : "") + date.getHours();
let h2 = document.querySelector("h2");
h2.innerHTML = ` ${days[day]}    ${hourses}:${minutes}`;
