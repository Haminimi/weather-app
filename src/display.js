import createDataObject, { createAccuWeatherDataObject } from './index';
import sun from './sun.png';
import moon from './moon.png';

const body = document.querySelector('body');
const dialog = document.querySelector('dialog');
const dialogCloseButton = document.getElementById('dialog-close-button');
const headerSticker = document.getElementById('header-sticker');

//Forecast for today and current conditions
const currentCity = document.getElementById('city');
const todayChanceOfRain = document.getElementById('today-chance-of-rain');
const currentWindSpeed = document.getElementById('current-wind');
const todayAirQuality = document.getElementById('today-air-quality');
const todayChanceOfSnow = document.getElementById('today-chance-of-snow');
const currentWindDirection = document.getElementById('current-wind-direction');
const currentHumidity = document.getElementById('current-humidity');
const todayAverage = document.getElementById('today-average');
const todayMoonPhase = document.getElementById('today-moon-phase');
const todayUV = document.getElementById('today-UV');

const currentTemp = document.getElementById('current-temp');
const todayDate = document.getElementById('today-date');
const currentTime = document.getElementById('current-time');
const currentCondition = document.getElementById('current-weather-description');
const todayIcon = document.getElementById('current-weather-icon');
const todayMin = document.getElementById('today-min');
const todayMax = document.getElementById('today-max');

//First forecast day
const firstDayDate = document.getElementById('first-day-date');
const firstDayDescription = document.getElementById('first-day-description');
const firstDayIcon = document.getElementById('first-day-icon');
const firstDayMinTemp = document.getElementById('first-day-min');
const firstDayMaxTemp = document.getElementById('first-day-max');
const firstDayChanceOfRain = document.getElementById(
	'first-day-chance-of-rain'
);
const firstDayWind = document.getElementById('first-day-wind');
const firstDayAirQuality = document.getElementById('first-day-air-quality');

//Second forecast day
const secondDayDate = document.getElementById('second-day-date');
const secondDayDescription = document.getElementById('second-day-description');
const secondDayIcon = document.getElementById('second-day-icon');
const secondDayMinTemp = document.getElementById('second-day-min');
const secondDayMaxTemp = document.getElementById('second-day-max');
const secondDayChanceOfRain = document.getElementById(
	'second-day-chance-of-rain'
);
const secondDayWind = document.getElementById('second-day-wind');
const secondDayAirQuality = document.getElementById('second-day-air-quality');

//Third forecast day
const thirdDayDate = document.getElementById('third-day-date');
const thirdDayDescription = document.getElementById('third-day-description');
const thirdDayIcon = document.getElementById('third-day-icon');
const thirdDayMinTemp = document.getElementById('third-day-min');
const thirdDayMaxTemp = document.getElementById('third-day-max');
const thirdDayChanceOfRain = document.getElementById(
	'third-day-chance-of-rain'
);
const thirdDayWind = document.getElementById('third-day-wind');
const thirdDayAirQuality = document.getElementById('third-day-air-quality');

//Time and date formatting
let timeZone;
function formatDate(string) {
	const date = new Date(string);
	const options = { weekday: 'long' };
	const weekDay = date.toLocaleDateString('en-us', options);
	const day = date.getDate().toString().padStart(2, '0');
	const month = (date.getMonth() + 1).toString().padStart(2, '0');
	const year = date.getFullYear();
	const formattedDate = `${weekDay}, ${day}/${month}/${year}`;
	return formattedDate;
}

export function displayLocalTime(zone) {
	const date = new Date();
	const timeZone = zone;

	const options = {
		timeZone,
		hour: 'numeric',
		minute: 'numeric',
		hour12: true,
	};

	const localTime = new Intl.DateTimeFormat('en-us', options).format(date);
	currentTime.textContent = localTime;
}

let lastMinute = -1;

export function updateLocalTime() {
	const currentMinute = new Date().getUTCMinutes();

	if (currentMinute !== lastMinute) {
		displayLocalTime(timeZone);
		lastMinute = currentMinute;
	}
}

export default async function displayWeatherData(city) {
	const extract = createDataObject(city);
	const data = await Promise.resolve(extract);
	const extractAccuWeatherData = createAccuWeatherDataObject(city);
	const accuWeatherData = await Promise.resolve(extractAccuWeatherData);

	if (data === null || accuWeatherData === null) {
		dialog.style.animationName = 'open-dialog-animation';
		dialog.showModal();
		dialog.style.display = 'flex';
		displayWeatherData('London');
	} else {
		headerSticker.src = sun;

		if (!data.isDayAtTheMoment) {
			body.style.background =
				'url(https://images.unsplash.com/photo-1507754988072-8667848efc79?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)';

			body.style.backgroundSize = 'cover';
			body.style.backgroundPosition = 'bottom';

			headerSticker.src = moon;
		}

		////Forecast for today and current conditions
		currentCity.textContent = `${data.weatherFor}, ${data.country}`;
		todayChanceOfRain.innerHTML = `Chance of rain: <span class="weather-value">${data.todayChanceOfRain}%</span> `;
		currentWindSpeed.innerHTML = `Wind: <span class="weather-value">${data.currentWindKph} km/h</span> `;
		todayAirQuality.innerHTML = `Air quality: <span class="weather-value">${accuWeatherData.todayAirQuality}</span>`;
		todayChanceOfSnow.innerHTML = `Chance of snow: <span class="weather-value">${data.todayChanceOfSnow}%</span>`;
		currentWindDirection.innerHTML = `Wind direction: <span class="weather-value">${data.currentWindDirection}</span>`;
		currentHumidity.innerHTML = `Humidity: <span class="weather-value">${data.todayHumidity}%</span> `;
		todayAverage.innerHTML = `Average temperature: <span class="weather-value">${data.todayAverageC} °C</span> `;
		todayMoonPhase.innerHTML = `Moon phase: <span class="weather-value">${data.todayMoonPhase}</span>`;
		todayUV.innerHTML = `UV: <span class="weather-value">${accuWeatherData.currentUvIndex}</span>`;

		currentTemp.textContent = `${data.currentTempC} °C`;
		todayDate.textContent = formatDate(new Date(accuWeatherData.todayDate));
		displayLocalTime(accuWeatherData.timeZone);
		timeZone = accuWeatherData.timeZone;
		currentCondition.textContent = `${data.currentCondition}`;
		const todayIconCode = `${accuWeatherData.currentWeatherIcon}`;
		const paddedtodayIconCode = todayIconCode.padStart(2, '0');
		const todayIconLink = `https://developer.accuweather.com/sites/default/files/${paddedtodayIconCode}-s.png`;
		todayIcon.src = todayIconLink;
		todayMin.textContent = Math.floor(data.todayMinTempC);
		todayMax.textContent = Math.ceil(data.todayMaxTempC);
	}
}
