import {
    mainTemp,
    cityName,
    countryName,
    mainDescription,
    mainImage,
    feelsLike,
    humidity,
    clouds,
    chanceOfRain,
    windSpeed,
    pressure,
    daily,
    sunrise,
    sunset,
    moonrise,
    moonset,
    setTimeOffset,
    dayName,
    dayNum,
    monthNum,
    year,
    hour,
    setTime,
    hourly
} from './callDomElements.js';

let lastCity = 'new york';
let currentCity = 'new york';
let units = 'metric';

// get api data from coordinates and display the data
async function getApiFromCoords(lat, lon, nameOfCity, country, units) {
    let api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&units=${units}&appid=20f7632ffc2c022654e4093c6947b4f4`;

    try {
        document.querySelector('.loading').style.opacity = '1';
        let response = await fetch(api);
        let data = await response.json();
        // console.log(data);

        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        let date = new Date();
        let myTimeZoneOffset = date.getTimezoneOffset() / 60;

        let timeZone = data.timezone_offset / 60 / 60;

        let timeOffset = timeZone + myTimeZoneOffset;

        let utc = date.getTime() + (date.getTimezoneOffset() * 60000);

        let userDate = new Date(utc + (data.timezone_offset * 1000));

        dayName.textContent = days[userDate.getDay()];
        dayNum.textContent = userDate.getDate() < 10 ? `0${userDate.getDate()}` : userDate.getDate();
        monthNum.textContent = month[userDate.getMonth()];
        year.textContent = userDate.getFullYear();
        hour.textContent = setTime(userDate);



        // set the main temperature
        mainTemp.textContent = `${Math.round(data.current.temp)}`;
        // set the city name
        cityName.textContent = `${nameOfCity} ‚ `;
        // set the main country name
        countryName.textContent = country;
        // set the main description
        mainDescription.textContent = data.current.weather[0].description;
        // set the main image
        // mainImage.src = `http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`;
        mainImage.src = `/imgs/${data.current.weather[0].icon}.png`;
        // set the condition feels like
        feelsLike.textContent = Math.round(data.current.feels_like);
        // set the condition humidity
        humidity.textContent = data.current.humidity;
        // set the condition clouds
        clouds.textContent = data.current.clouds;
        // set the condition chance of rain
        chanceOfRain.textContent = Math.round(data.daily[0].pop * 100);
        // set the condition wind speed
        if (units == 'metric') {
            windSpeed.textContent = Math.round(data.current.wind_speed * 3.6);
        } else {
            windSpeed.textContent = Math.round(data.current.wind_speed);
        }
        // set the condition pressure
        pressure.textContent = Math.round(data.current.pressure / 10);

        // set the sunrise
        let sunriseDate = setTimeOffset(data.daily[1].sunrise, timeOffset);
        sunrise.textContent = sunriseDate.fullTime;
        // set the sunset
        let sunsetDate = setTimeOffset(data.daily[1].sunset, timeOffset);
        sunset.textContent = sunsetDate.fullTime;

        // change background image after sunset
        // if ((hour.textContent.includes('P') && parseInt(hour.textContent.slice(0, 2)) >= sunsetDate.hour) || (hour.textContent.includes('A') && parseInt(hour.textContent.slice(0, 2)) <= sunriseDate.hour)) {
        if ((data.current.weather[0].icon).includes('n')) {
            // console.log('hi');
            // document.body.style.backgroundImage = 'url(../imgs/sunrise-and-sunset6.jpg)';
            // document.querySelectorAll('.container >*:not(.search-main)').forEach(div => {
            //     div.style.background = 'rgb(255 255 255 / 10%)';
            // });
            // document.querySelector('.search-main > *').style.background = 'rgb(255 255 255 / 10%)';
            // document.querySelector('.search-main > .main').style.background = 'rgb(255 255 255 / 10%)';
        } else {
            // document.body.style.backgroundImage = 'url(../imgs/sunrise-and-sunset.jpg)';
            // document.querySelectorAll('.container >*:not(.search-main)').forEach(div => {
            //     div.style.background = 'rgba(0, 0, 0, 0.25)';
            // });
            // document.querySelector('.search-main > *').style.background = 'rgba(0, 0, 0, 0.25)';
            // document.querySelector('.search-main > .main').style.background = 'rgba(0, 0, 0, 0.25)';
        }

        // set the moonrise
        let moonriseDate = setTimeOffset(data.daily[0].moonrise, timeOffset);
        moonrise.textContent = moonriseDate.fullTime;
        // set the moonset
        let moonsetDate = setTimeOffset(data.daily[0].moonset, timeOffset);
        moonset.textContent = moonsetDate.fullTime;

        // set the days in daily
        daily.forEach((day, index) => {
            let dayName = day.querySelector('.day-name');
            let dayImg = day.querySelector('.image img');
            let minTemp = day.querySelector('.temp .min');
            let maxTemp = day.querySelector('.temp .max');

            dayName.textContent = days[new Date(data.daily[index].dt * 1000).getDay()];
            // dayImg.src = `http://openweathermap.org/img/wn/${data.daily[index].weather[0].icon}@2x.png`;
            dayImg.src = `/imgs/${data.daily[index].weather[0].icon}.png`;
            minTemp.textContent = Math.round(data.daily[index].temp.min);
            maxTemp.textContent = Math.round(data.daily[index].temp.max);
        });

        // set the hours in hourly
        hourly.forEach((hour, index) => {
            let hourNumber = hour.querySelector('.hour-number');
            let img = hour.querySelector('.image img');
            let temp = hour.querySelector('.temp > .temp');

            hourNumber.textContent = setTime(new Date(data.hourly[index].dt * 1000));
            // img.src = `http://openweathermap.org/img/wn/${data.hourly[index].weather[0].icon}@2x.png`
            img.src = `/imgs/${data.hourly[index].weather[0].icon}.png`;
            temp.textContent = Math.round(data.hourly[index].temp);
        });
        setTimeout(() => {
            document.querySelector('.loading').style.opacity = '0';
        }, 300);

    } catch (error) {
        console.log('Error when fetching data:', error);
    }
}

// get coordinates from city name and pass it to the (getApiFromCoords) function.
async function getCityCoordiates(cityName) {
    // let apiKey = '3fbfcddb23c2f046fd82f7361c6bafdc';
    // let api = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}&units=${units}`;
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=20f7632ffc2c022654e4093c6947b4f4`;


    try {
        let cityResponse = await fetch(api);
        let cityData = await cityResponse.json();
        // console.log(cityData);

        getApiFromCoords(cityData.coord.lat, cityData.coord.lon, cityData.name, cityData.sys.country, units);

    } catch (error) {
        console.error('Error when fetching data:', error);
    }
}

// Execution Time
getCityCoordiates(currentCity);

function searchLocation() {
    daily.innerHTML = '';
    currentCity = searchInput.value;
    lastCity = currentCity;
    getCityCoordiates(currentCity);
    searchInput.value = '';
}

let searchInput = document.querySelector('.search-main .search input');
let searchIcon = document.querySelector('.search-main .search i');
searchInput.addEventListener('keydown', (e) => {
    if (searchInput.value == '') return;
    if (e.key == "Enter") {
        searchLocation();
    }
});
searchIcon.addEventListener('click', (e) => {
    if (searchInput.value == '') return;
    searchLocation();
})

// convert from celsius to fahrenheit and vice versa.
let switchBtns = document.querySelectorAll('.search-main .switch-units > div');
let switchBg = document.querySelector('.search-main .switch-units .bg');
let allUnits = document.querySelectorAll('.temp-unit');
let windUnit = document.querySelector('.wind-speed .content .value .unit');

switchBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        if (btn.classList.contains('celsius')) {
            switchBg.style.left = '3px';
            document.querySelector('.celsius').style.color = '#FFF';
            document.querySelector('.fahrenheit').style.color = '#000';
            units = 'metric';
            getCityCoordiates(lastCity);
            allUnits.forEach(unit => {
                unit.textContent = 'C';
            });
            windUnit.textContent = 'Km/h';

        } else {
            switchBg.style.left = '50%';
            document.querySelector('.celsius').style.color = '#000';
            document.querySelector('.fahrenheit').style.color = '#FFF';
            units = 'imperial';
            getCityCoordiates(lastCity);

            allUnits.forEach(unit => {
                unit.textContent = 'F';
            });
            windUnit.textContent = 'MPH';
        }
    });
});

// current location button
let currentBtn = document.querySelector('.search-main .current-location');

currentBtn.addEventListener('click', () => {
    async function successCallback(position) {
        // console.log(position);
        // let apiLink = `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=bqaNydUISBCGNIDR1eOCjNzSV3QxVKIC&q=${position.coords.latitude},${position.coords.longitude}`;
        // let apiLink = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&${position.coords.longitude}&appid=3fbfcddb23c2f046fd82f7361c6bafdc`;
        let apiLink = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`;
        let response = await fetch(apiLink);
        let data = await response.json();
        // console.log(data);
        getApiFromCoords(data.latitude, data.longitude, data.city, data.countryCode, units);
        lastCity = data.city;
    };
    navigator.geolocation.getCurrentPosition(successCallback);
});