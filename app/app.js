import 'es6-promise';
import 'whatwg-fetch';

let baseUrl = "http://api.openweathermap.org/data/2.5/";
let apiKey = "97e2a65458fa6ffa369e9f2c945bd316";

navigator.geolocation.getCurrentPosition(function(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  fetch(`${baseUrl}weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      // console.log(response);
      document.querySelector("#cityName").textContent = response.name;
      document.querySelector("#currentCondition").textContent = response.weather[0].description;
      let currentTemp = Math.round(Number(response.main.temp));
      document.querySelector("#currentTemp").textContent = `${currentTemp}°`;
    });

  fetch(`${baseUrl}forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      console.log(response);

      let day1 = response.list[2];
      let day2 = response.list[10];
      let day3 = response.list[18];
      let day4 = response.list[26];
      let day5 = response.list[34];


      let date1 = new Date(day1.dt * 1000);
      let dayOfWeekValue = date1.getDay();

      let highTempValue = Math.round(Number(day1.main.temp));
      let lowTempValue = Math.round(Number(response.list[0].main.temp));
      let iconCode = day1.weather[0].icon;
      let iconCodeUrl =`http://openweathermap.org/img/w/${iconCode}.png`

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

        let day1Div = document.querySelector("#day1");
          let dayOfWeek = document.createElement("div");
            dayOfWeek.classList.add("dayOfWeek");
            day1Div.appendChild(dayOfWeek);
            dayOfWeek.textContent = dayOfWeekName;

          let weatherIcon = document.createElement("div");
            weatherIcon.classList.add("weatherIcon");
            day1Div.appendChild(weatherIcon);
          let weatherIconImg = document.createElement("img");
            weatherIconImg.src = iconCodeUrl;
            weatherIcon.appendChild(weatherIconImg);

          let highTemp = document.createElement("div");
            highTemp.classList.add("highTemp");
            day1Div.appendChild(highTemp);
            highTemp.textContent = `${highTempValue}°`;

          let lowTemp = document.createElement("div");
            lowTemp.classList.add("lowTemp");
            day1Div.appendChild(lowTemp);
            lowTemp.textContent = `${lowTempValue}°`;




      //   console.log(dayOfWeekName);
      // let rows = document.querySelectorAll(".row");
      // rows.forEach((row) => {
      //   let dayOfWeek = document.createElement("div");
      //     dayOfWeek.classList.add("dayOfWeek");
      //     day1.appendChild(dayOfWeek);
      //     dayOfWeek.textContent = dayOfWeekName;
      //
      // })
    });
});


// fetch(`http://api.openweathermap.org/data/2.5/forecast/daily?lat=<latitude>&lon=<longitude>&APPID=<97e2a65458fa6ffa369e9f2c945bd316>&units=imperial`)
//   .then((response) => {
//     return response.json();
//   })
//   .then((response) => {
//     console.log(response);
//   });
