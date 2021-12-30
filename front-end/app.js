const body = document.querySelector("body");
const card = document.querySelector(".card");
const input = document.querySelector(".input");
const btn = document.querySelector(".btn");
const locationDetected = document.querySelector(".location");
const temp = document.querySelector(".temp");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");
const icon = document.querySelector(".icon");
const alertContainer = document.querySelector(".alert");
const alertText = document.querySelector(".alert p");

const server = "https://rocky-inlet-97917.herokuapp.com/";

window.addEventListener("load", getLocation);

function getLocation() {
  if (!navigator.geolocation) return;

  navigator.geolocation.getCurrentPosition(getPosition);
}

function getPosition(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const api = server + latitude + "&" + longitude;
  fetchPossition(api);
}

handelAlert = () => {
  alertContainer.classList.toggle("hide");
  card.classList.toggle("blur");
  setTimeout(() => {
    alertContainer.classList.toggle("hide");
    card.classList.toggle("blur");
  }, 1200);
};

fetchPossition = (api) => {
  fetch(api)
    .then((response) => {
      if (response) return response.json();
    })
    .then((data) => {
      renderWeather(data);
    })
    .catch((err) => {
      handelAlert();
    });
};

btn.addEventListener("click", (e) => {
  searchForLocationWeather(input.value);
});

input.addEventListener("keyup", (e) => {
  if (e.key === "Enter") searchForLocationWeather(input.value);
});

searchForLocationWeather = (city) => {
  if (!input.value.trim()) return;
  const api = server + city;
  input.value = "";
  fetchPossition(api);
};

renderWeather = (data) => {
  temp.innerText = `${Math.round(data.main.temp)} °C`;
  locationDetected.innerText = `${data.sys.country}, ${data.name}`;
  humidity.innerText = `Humidity: ${data.main.humidity}%`;
  wind.innerText = `Wind speed: ${data.wind.speed} Km/h`;
  icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
};
