const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");
const container = document.querySelector(".container");
const myBody = document.querySelector("body");

const updateUI = (data) => {
  const { cityDets, weather } = data;

  //update details template
  details.innerHTML = `<h5 class="my-3">${cityDets.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
      <span>${weather.Temperature.Metric.Value}</span>
      <span>&deg;C</span>
    </div>
    `;

  //update day/night & icons
  const iconSrc = `weatherapp/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute("src", iconSrc);

  let timeSrc = null;
  if (weather.IsDayTime) {
    timeSrc = "weatherapp/day.jpg";
  } else {
    timeSrc = "weatherapp/night.jpg";
  }
  time.setAttribute("src", timeSrc);

  //remove the d-none class if present

  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }

  if (weather.IsDayTime) {
    container.style.boxShadow = "0 0 30px #fcf712";
    container.style.backgroundColor = "#fcf712";
    myBody.style.backgroundImage =
      "url(https://www.pixelstalk.net/wp-content/uploads/2016/07/Weather-Images-HD.jpg)";
  } else {
    container.style.backgroundColor = "#312F36";
    container.style.boxShadow = " 0 0 30px #312F36";
    myBody.style.backgroundImage =
      "url(https://www.pixelstalk.net/wp-content/uploads/2016/07/Weather-Desktop-Backgrounds.jpg)";
  }
};

const updateCity = async (city) => {
  const cityDets = await getCity(city);
  const weather = await getWeather(cityDets.Key);

  return { cityDets, weather }; //values and properties are the same so I used object shorthand notation
};

cityForm.addEventListener("submit", (e) => {
  //adding a submit event listener to the form
  //prevent def action
  e.preventDefault();
  //get city value
  const city = cityForm.city.value.trim();
  cityForm.reset();

  //update the user interface with the new city
  updateCity(city)
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));
});
