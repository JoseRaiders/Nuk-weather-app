//Displays current day and time
let now = new Date();
let today = document.querySelector("#todays-date");

let currentDate = now.getDate();
let currentHours = now.getHours();
	if (currentHours < 10) {
		currentHours = `0${currentHours}`;
	}

let currentMinutes = now.getMinutes();
	if (currentMinutes < 10) {
		currentMinutes = `0${currentMinutes}`;
	}

let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let currentDay = days[now.getDay()];

today.innerHTML = `${currentDay} ${currentHours}:${currentMinutes}`;


//Display temporary location with weather conditions
function search(city) {
	let apiKey = "754ef6f31ce264860cfc37f3accd1fdf";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
	axios.get(apiUrl).then(displayWeather);
}

function submitAction(event) {
	event.preventDefault();
	let city = document.querySelector("#search-location").value;
	search(city);
}

//Displays users current location and weather conditions
function usersLocation(position) {
	let apiKey = "754ef6f31ce264860cfc37f3accd1fdf";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;
	axios.get(apiUrl).then(displayWeather).then(usersLocationForecast);
}


//Display searched location with temperture, humidity and wind
function displayWeather(response) {
	document.querySelector("h1").innerHTML = `<i class="bi bi-geo-alt-fill"></i>${response.data.name.trim().toUpperCase()}`;
	document.querySelector("#current-temp").innerHTML = Math.round(response.data.main.temp);
	document.querySelector(".humidity").innerHTML = response.data.main.humidity;
	document.querySelector(".wind").innerHTML = Math.round(response.data.wind.speed);
	let description = document.querySelector(".weather-condition");
	description.innerHTML = response.data.weather[0].description.toUpperCase();
}

//Updates to current users location
function usersCurrentLocation(event) {
	event.preventDefault();
	navigator.geolocation.getCurrentPosition(usersLocation);
}


//Toggle to Fahrenheit
function fahrenheit(event) {
	event.preventDefault();
	let temperture = document.querySelector(".current-temp");
	temperture.innerHTML = 75;
}

//Toggle to Celsius
function celsius(event) {
	event.preventDefault();
	let temperture = document.querySelector(".current-temp");
	temperture.innerHTML = 23;
}

let searchLocation = document.querySelector("#form");
searchLocation.addEventListener("submit", submitAction);

let fDegree = document.querySelector("#btn-f");
fDegree.addEventListener("click", fahrenheit);

let cDegree = document.querySelector("#btn-c");
cDegree.addEventListener("click", celsius);

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", usersCurrentLocation);

//Temporary displayed location
search("Los Angeles");