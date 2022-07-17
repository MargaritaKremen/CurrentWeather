function geolocation(position) {
  let apiKey = "f3a4c7fd1572e38d1a0b0f724e0e0218";

  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayTemperature);
}
function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(geolocation);
}

function displayTemperature(response) {
  console.log(response);
  let cityElement = response.data.name;
  let h1 = document.querySelector(".fontHead");  
  h1.innerHTML = `${cityElement}`;

  let temperatureElement = document.querySelector(".fontC");
  celsiusTemperature = Math.round(response.data.main.temp);
  temperatureElement.innerHTML = Math.round(celsiusTemperature);

 
  let descriptionElement = document.querySelector(".weather");
  descriptionElement.innerHTML = response.data.weather[0].description;
  
  let humidityElement = document.querySelector(".humidity");
  console.log(response.data.main.humidity);
  humidityElement.innerHTML = response.data.main.humidity;

  let windElement = document.querySelector("#wind");  
  windElement.innerHTML = Math.round(response.data.wind.speed);

  
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

}

function search(city) {   //add
  let apiKey = "f3a4c7fd1572e38d1a0b0f724e0e0218";
  let units = "metric";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {         //SignUp
  event.preventDefault();
  let input = document.querySelector("#city-input");
 
  search(input.value);
}

let form = document.querySelector("form#form-input");
form.addEventListener("submit", handleSubmit);
let btn = document.querySelector("#button1");
btn.addEventListener("click", getPosition);

function tempC(event) {
  event.preventDefault();
  let tempC = document.querySelector(".fontC");
  tempC.innerHTML = `${celsiusTemperature}`;
}
let linkC = document.querySelector("#tempC");
linkC.addEventListener("click", tempC);

function tempF(event) {
  event.preventDefault();

  let tempF = document.querySelector(".fontC");
  tempF.innerHTML = Math.round(( celsiusTemperature * 9) / 5 + 32);
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

search("Estoril");
