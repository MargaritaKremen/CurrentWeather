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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}
function displayForecast(response){
  console.log(response.data);
   let forecast = response.data.daily;
   
   let forecastElement = document.querySelector("#forecast");
   let forecastHTML = "";
  
   forecast.forEach(function (forecastDay, index){
    if (index < 6) {
    forecastHTML = forecastHTML +
       ` 
       <ul class="list-group list-group-horizontal-sm">
       <li class="list-group-item col1">
       <img src="http://openweathermap.org/img/wn/${
        forecastDay.weather[0].icon
      }@2x.png" alt=""
      width="42"/>  
      ${formatDay(forecastDay.dt)} ` - `${forecastDay.weather[0].main} 
       </li>
       <li class="list-group-item col2">${Math.round(
        forecastDay.temp.max
      )}°/${Math.round(
        forecastDay.temp.min
      )}°</li>
       </ul>
       `;
      }
   });
   
   forecastElement.innerHTML = forecastHTML;
 }
// ${response.data.weather[0].main}
function getForecast(coordinates) {
  let apiKey = "f3a4c7fd1572e38d1a0b0f724e0e0218";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
  console.log(apiUrl);
}

function displayTemperature(response) {
  
  let cityElement = response.data.name; 
  console.log(cityElement);
  let h1 = document.querySelector(".fontHead");  
  h1.innerHTML = `${cityElement}`;

  let temperatureElement = document.querySelector(".fontC");
    console.log(temperatureElement);
  celsiusTemperature = Math.round(response.data.main.temp);
  temperatureElement.innerHTML = Math.round(celsiusTemperature);

 
  let descriptionElement = document.querySelector(".weather");
  descriptionElement.innerHTML = response.data.weather[0].description;

  let humidityElement = document.querySelector(".humidity");
 
  humidityElement.innerHTML = response.data.main.humidity;

  let windElement = document.querySelector("#wind");  
  windElement.innerHTML = Math.round(response.data.wind.speed);

  
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  let dateElement = document.querySelector("h2");
//h2.innerHTML = ` ${days[day]}    ${hourses}:${minutes}`;
dateElement.innerHTML = formatDate(response.data.dt * 1000);
  getForecast(response.data.coord);
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

function formatDate(timestamp) {
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
//let day = date.getDay();
let day = days[date.getDay()];
let minutes = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes(); 
let hours = (date.getHours() < 10 ? "0" : "") + date.getHours();
return `${day} ${hours}:${minutes}`;
}


search("Estoril");
//displayForecast();