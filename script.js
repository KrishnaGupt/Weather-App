const searchButton = document.getElementById("search");
const cityInput = document.getElementById("city_input");
const cityName = document.getElementById("city");
const currentDay = document.getElementById("current_day");
const currentTime = document.getElementById("current_time");
const tempDeg = document.getElementById("temp_deg");
const tempUnit = document.getElementById("temp_unit");
const sky = document.getElementById("sky");
const cloudsCover = document.getElementById("cloud_cover");
const windSpeed = document.getElementById("wind_speed");
const humidity = document.getElementById("humidity");
const latitude = document.getElementById("latitude");
const longitude = document.getElementById("longitude");
const sunset = document.getElementById("sunset");
const sunrise = document.getElementById("sunrise");
const icon = document.getElementById("_icon");
const loading = document.querySelector('#loading');

const week = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
let apikey = YOUR_API_KEY_HERE;
searchButton.addEventListener("click", () => {
  loading.style.display = 'block';
  let city = cityInput.value;
  if (city != "") {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apikey}&units=metric`;
    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        loading.style.display = 'none';
        getWeather(response);
      })
      .catch((err) => console.error(err));
  } else {
    alert("Please enter a valid City name");
  }
});

function getWeather(response){
    cityName.innerHTML = response.name;
    const day = new Date();
    let today = week[day.getDay()];
    let time = `${day.getHours()}:${day.getMinutes()}`;
    currentDay.innerHTML = today;
    currentTime.innerHTML = time;
        // console.log(response);
        tempDeg.innerHTML = `${response.main.temp.toFixed(1)}<span id="temp_unit">°C</span>`;
        sky.innerHTML = response.weather[0].main;
        cloudsCover.innerHTML = `<i class="bi bi-clouds-fill"></i> Cloud cover: ${response.clouds.all}%`;
        windSpeed.innerHTML = `<i class="bi bi-wind"></i> Wind Speed: ${response.wind.speed}m/s`;
        humidity.innerHTML = `<i class="bi bi-droplet-fill"></i> Humidity: ${response.main.humidity}%`;
        latitude.innerHTML = `Latitude: ${response.coord.lat}`;
        longitude.innerHTML = `Longitude: ${response.coord.lon}`;
        let newSunset = new Date(response.sys.sunset * 1000);
        newSunset = newSunset.toLocaleTimeString();
        let newSunrise = new Date(response.sys.sunrise * 1000);
        newSunrise = newSunrise.toLocaleTimeString();
        sunset.innerHTML = `Sunset: ${newSunset}`;
        sunrise.innerHTML = `Sunrise: ${newSunrise}`;
        let weatherCon = response.weather[0].main;
        if (weatherCon == "Clear") {
          icon.style.color = "#ffff00";
          icon.classList.add("bi-brightness-low-fill");
          icon.classList.remove(
            "bi-cloud-haze-fill",
            "bi-clouds-fill",
            "bi-cloud-drizzle-fill",
            "bi-cloud-fog-fill",
            "bi-cloud-lightning-rain-fill",
            "bi-cloud-snow-fill"
          );
        } else if (weatherCon == "Clouds") {
          icon.style.color = "#fff";
          icon.classList.add("bi-clouds-fill");
          icon.classList.remove(
            "bi-cloud-haze-fill",
            "bi-brightness-low-fill",
            "bi-cloud-drizzle-fill",
            "bi-cloud-fog-fill",
            "bi-cloud-lightning-rain-fill",
            "bi-cloud-snow-fill"
          );
        } else if (weatherCon == "Rain") {
          icon.style.color = "#fff";
          icon.classList.add("bi-cloud-drizzle-fill");
          icon.classList.remove(
            "bi-cloud-haze-fill",
            "bi-brightness-low-fill",
            "bi-clouds-fill",
            "bi-cloud-fog-fill",
            "bi-cloud-lightning-rain-fill",
            "bi-cloud-snow-fill"
          );
        } else if (weatherCon == "Snow") {
          icon.style.color = "#fff";
          icon.classList.add("bi-cloud-snow-fill");
          icon.classList.remove(
            "bi-cloud-haze-fill",
            "bi-brightness-low-fill",
            "bi-clouds-fill",
            "bi-cloud-fog-fill",
            "bi-cloud-lightning-rain-fill",
            "bi-cloud-drizzle-fill"
          );
        } else if (weatherCon == "Haze") {
          icon.style.color = "#fff";
          icon.classList.add("bi-cloud-haze-fill");
          icon.classList.remove(
            "bi-cloud-snow-fill",
            "bi-brightness-low-fill",
            "bi-clouds-fill",
            "bi-cloud-fog-fill",
            "bi-cloud-lightning-rain-fill",
            "bi-cloud-drizzle-fill"
          );
        } else if (weatherCon == "Thunderstorm") {
          icon.style.color = "#fff";
          icon.classList.add("bi-cloud-lightning-rain-fill");
          icon.classList.remove(
            "bi-cloud-snow-fill",
            "bi-brightness-low-fill",
            "bi-clouds-fill",
            "bi-cloud-fog-fill",
            "bi-cloud-haze-fill",
            "bi-cloud-drizzle-fill"
          );
        } else if (weatherCon == "Fog") {
          icon.style.color = "#fff";
          icon.classList.add("bi-cloud-fog-fill");
          icon.classList.remove(
            "bi-cloud-snow-fill",
            "bi-brightness-low-fill",
            "bi-clouds-fill",
            "bi-cloud-lightning-rain-fill",
            "bi-cloud-haze-fill",
            "bi-cloud-drizzle-fill"
          );
        }
        else if (weatherCon == "Mist") {
          icon.style.color = "#fff";
          icon.classList.add("bi-cloud-fog2-fill");
          icon.classList.remove(
            "bi-cloud-snow-fill",
            "bi-brightness-low-fill",
            "bi-clouds-fill",
            'bi-cloud-fog-fill',
            "bi-cloud-lightning-rain-fill",
            "bi-cloud-haze-fill",
            "bi-cloud-drizzle-fill"
          );
        }
}

navigator.geolocation.getCurrentPosition((position) => {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  getData(lat, long, apikey)
});
function getData(lat, long, apikey){
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&limit=1&appid=${apikey}&units=metric`;
  fetch(url)
  .then((response) => response.json())
  .then((response) => {
    getWeather(response);
  })
  .catch((err) => console.error(err));
}