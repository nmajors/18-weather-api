import 'es6-promise';
import 'whatwg-fetch';

let baseUrl = "https://whispering-everglades-16419.herokuapp.com/data/2.5/";


navigator.geolocation.getCurrentPosition(function(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  fetch(`${baseUrl}weather?lat=${latitude}&lon=${longitude}&units=imperial`)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      document.querySelector("#cityName").textContent = response.name;
      document.querySelector("#currentCondition").textContent = response.weather[0].description;
      let currentTemp = Math.round(Number(response.main.temp));
      document.querySelector("#currentTemp").textContent = `${currentTemp}°`;
    });

  fetch(`${baseUrl}forecast/daily?lat=${latitude}&lon=${longitude}&units=imperial`)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      console.log(response);
      console.log(response.list);

      let days = response.list;
      var day;
      days.forEach((day) => {
        let date = new Date(day.dt * 1000);
        let dayOfWeekValue = date.getDay();

        let highTempValue = Math.round(Number(day.temp.max));
        let lowTempValue = Math.round(Number(day.temp.min));
        let iconCode = day.weather[0].icon;
        let iconCodeUrl = `https://openweathermap.org/img/w/${iconCode}.png`

        var dayOfWeekName
        switch (dayOfWeekValue) {
          case 0:
            dayOfWeekName = "Monday";
            break;
          case 1:
            dayOfWeekName = "Tuesday";
            break;
          case 2:
            dayOfWeekName = "Wednesday";
            break;
          case 3:
            dayOfWeekName = "Thursday";
            break;
          case 4:
            dayOfWeekName = "Friday";
            break;
          case 5:
            dayOfWeekName = "Saturday";
            break;
          case 6:
            dayOfWeekName = "Sunday";
            break;
          default:
            dayOfWeekName = "Error";
            break;
        }
        let forecast = document.querySelector(".forecast");
        let row = document.createElement("div");
        row.classList.add("row");
        forecast.appendChild(row);
        let dayOfWeek = document.createElement("div");
        dayOfWeek.classList.add("dayOfWeek");
        row.appendChild(dayOfWeek);
        dayOfWeek.textContent = dayOfWeekName;

        let weatherIcon = document.createElement("div");
        weatherIcon.classList.add("weatherIcon");
        row.appendChild(weatherIcon);
        let weatherIconImg = document.createElement("img");
        weatherIconImg.src = iconCodeUrl;
        weatherIcon.appendChild(weatherIconImg);

        let highTemp = document.createElement("div");
        highTemp.classList.add("highTemp");
        row.appendChild(highTemp);
        highTemp.textContent = `${highTempValue}°`;

        let lowTemp = document.createElement("div");
        lowTemp.classList.add("lowTemp");
        row.appendChild(lowTemp);
        lowTemp.textContent = `${lowTempValue}°`;
      })
    });
});
