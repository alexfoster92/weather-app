// API OBJECT
const api = {
    key: process.env.API_KEY,
    baseurl: "https://api.openweathermap.org/data/2.5/"
}

// EVENT LISTENER TO GET AND SET WEATHER DEPENDING ON COORDINATES
window.addEventListener("load", () => {
    let long;
    let lat;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            fetch(`${api.baseurl}weather?lat=${lat}&lon=${long}&units=metric&appid=${api.key}`)
                .then(weather => {
                    return weather.json();
                }).then(displayResults);
        }, showError);
    }
});

// ERROR MESSAGE FOR DENIED GEOLOCATION
const notificationElement = document.querySelector(".notification");
const weatherEl = document.querySelector(".current .weather");

function showError() {
    if (weatherEl.innerText === "-") {
        notificationElement.style.display = "block";
        notificationElement.innerHTML = `<p>User denied geolocation</p>`;
        console.log("Checking if info displayed...");
    } else {
        notificationElement.style.display = "none";
    }
}

// INTERVAL CHECK TO REMOVE ERROR MESSAGE IF USER HAS SEARCHED FOR A CITY
setInterval(showError, 1000);
if (notificationElement.style.display === "none") {
    clearInterval();
}

// SEARCH INPUT SELECTION AND KEYPRESS EVENT LISTENER
const searchInput = document.querySelector(".search-input");
searchInput.addEventListener("keypress", setQuery);

// EVENT LISTENER FOR SEARCH INPUT
function setQuery(e) {
    if (e.key === "Enter") {
        getResults(searchInput.value);
        searchInput.value = "";
        searchInput.blur();
    }
}

// API FETCH FUNCTION
function getResults(query) {
    fetch(`${api.baseurl}weather?q=${query}&units=metric&appid=${api.key}`)
        .then(weather => {
            return weather.json();
        }).then(displayResults)
}

// DISPLAY RESULTS FUNCTION TO CHANGE DISPLAYED HTML TEXT
function displayResults(weather) {
    let icon = document.querySelector(".weather-icon");
    icon.innerHTML = `<img src="icons/${weather.weather[0].icon}.svg"/>`;

    let city = document.querySelector(".location .city");
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector(".location .date");
    date.innerText = dateBuilder(now);

    let temp = document.querySelector(".current .temp");
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

    let weatherEl = document.querySelector(".current .weather");
    weatherEl.innerText = weather.weather[0].main;
}

// DATE BUILDER FUNCTION
function dateBuilder(d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
}