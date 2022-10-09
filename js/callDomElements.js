let mainTemp = document.querySelector('.search-main .main .temperature .num');
let cityName = document.querySelector('.search-main .main .city span.city');
let countryName = document.querySelector('.search-main .main .city span.country');
let mainDescription = document.querySelector('.search-main .main .discription');
let mainImage = document.querySelector('.search-main .main .icon img');
let feelsLike = document.querySelector('.conditions .feels-like .value .num');
let humidity = document.querySelector('.conditions .humidity .value .num');
let clouds = document.querySelector('.conditions .clouds .value .num');
let chanceOfRain = document.querySelector('.conditions .chance-of-rain .value .num');
let windSpeed = document.querySelector('.conditions .wind-speed .value .num');
let pressure = document.querySelector('.conditions .pressure .value .num');
let daily = document.querySelectorAll('.daily-hourly .daily .day');
let sunrise = document.querySelector('.additional .content .sunrise .content time');
let sunset = document.querySelector('.additional .content .sunset .content time');
let moonrise = document.querySelector('.additional .content .moonrise .content time');
let moonset = document.querySelector('.additional .content .moonset .content time');
let dayName = document.querySelector('.additional .date-time .day-name');
let dayNum = document.querySelector('.additional .date-time .date .day-num');
let monthNum = document.querySelector('.additional .date-time .date .month');
let year = document.querySelector('.additional .date-time .date .year');
let hour = document.querySelector('.additional .date-time .time .hour');
let hourly = document.querySelectorAll('.daily-hourly .hourly .hour');

// document.addEventListener('click', (e) => {
//         if (!e.target.closest('.daily-hourly .buttons')) return;

// })

let btns = document.querySelectorAll('.daily-hourly .buttons > div');
let dailyList = document.querySelector('.daily-hourly .daily');
let hourlyList = document.querySelector('.daily-hourly .hourly');
let bg = document.querySelector('.daily-hourly .buttons .bg');

btns.forEach(btn => {
        btn.addEventListener('click', () => {
                if (btn.classList.contains('daily-btn')) {
                        dailyList.classList.add('active');
                        hourlyList.classList.remove('active');
                        bg.style.left = '3px';
                        document.querySelector('.daily-btn').style.color = '#FFF';
                        document.querySelector('.hourly-btn').style.color = '#000';
                        // bg.classList.add('animation-triger');
                        // setTimeout(() => {
                        //         bg.classList.remove('animation-triger');
                        // }, 100);
                } else {
                        hourlyList.classList.add('active');
                        dailyList.classList.remove('active');
                        bg.style.left = 'calc(50%)';
                        document.querySelector('.daily-btn').style.color = '#000';
                        document.querySelector('.hourly-btn').style.color = '#FFF';
                        // bg.classList.add('animation-triger');
                        // setTimeout(() => {
                        //         bg.style.left = 'calc(50%)';
                        //         bg.classList.remove('animation-triger');
                        // }, 100);
                }
        });
});






function setTimeOffset(mille, timeOffset) {
        let timeOff = timeOffset;

        let date = new Date(mille * 1000);
        let hour = date.getHours();
        let minite = date.getMinutes();

        if (timeOff - Math.trunc(timeOff) !== 0) {
                // timeOff = Math.trunc(timeOff);
                let minitesOffset = (timeOff - Math.trunc(timeOff)) * 60;

                if (minitesOffset + minite >= 60) {
                        hour += 1;
                        minite = ((minitesOffset + minite) - 60);
                } else {
                        minite += minitesOffset;
                }
                // console.log(minitesOffset);
                // console.log('timeOff', timeOff);
                // console.log('minitesOffset', minitesOffset);
        }
        // console.log('hour', hour);
        // console.log('time Offset', timeOff);
        // if (hour === 0) hour = 12;
        if (hour + timeOff < 0) {
                hour = -(hour + timeOff);
        } else {
                hour = hour + timeOff;
        }
        // console.log('hour offset', hour);


        let time = 'AM';
        hour = Math.trunc(hour);

        if (hour >= 24) {
                hour -= 24;
                time = 'AM';
        }

        if (hour >= 12) {
                hour = `${hour - 12}`;
                time = 'PM';
        }

        if (hour < 10) {
                hour = `0${hour}`;
        }

        if (minite < 10) {
                minite = `0${minite}`;
        }


        return {
                fullTime: `${hour} : ${minite} ${time}`,
                hour: hour,
                minite: minite
        };
}

function setTime(dateTime) {
        let hour = dateTime.getHours();
        let minite = dateTime.getMinutes();
        let time = 'AM';

        if (hour >= 12) {
                hour -= 12;
                if (hour == 0) hour = 12;
                time = 'PM';
        }

        if (hour < 10) {
                hour = `0${hour}`;
        }

        if (hour == 0) hour = 12;

        if (minite < 10) {
                minite = `0${minite}`;
        }

        return `${hour} : ${minite} ${time}`;
}


export {
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
};