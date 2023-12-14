/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && !scriptUrl) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  P: () => (/* binding */ createAccuWeatherDataObject),
  Z: () => (/* binding */ createDataObject)
});

;// CONCATENATED MODULE: ./src/sun.png
const sun_namespaceObject = __webpack_require__.p + "09f9e9d542ac0f0a0aa1.png";
;// CONCATENATED MODULE: ./src/moon.png
const moon_namespaceObject = __webpack_require__.p + "e0c25eba3993c5ee2b54.png";
;// CONCATENATED MODULE: ./src/display.js




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

function displayLocalTime(zone) {
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

function updateLocalTime() {
	const currentMinute = new Date().getUTCMinutes();

	if (currentMinute !== lastMinute) {
		displayLocalTime(timeZone);
		lastMinute = currentMinute;
	}
}

async function displayWeatherData(city) {
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
		headerSticker.src = sun_namespaceObject;

		if (!data.isDayAtTheMoment) {
			body.style.background =
				'url(https://images.unsplash.com/photo-1507754988072-8667848efc79?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)';

			body.style.backgroundSize = 'cover';
			body.style.backgroundPosition = 'bottom';

			headerSticker.src = moon_namespaceObject;
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

		//First day
		firstDayDate.textContent = formatDate(accuWeatherData.firstDayDate);
		firstDayDescription.textContent = `${accuWeatherData.firstDayIconPhrase}`;
		const firstDayIconCode = `${accuWeatherData.firstDayIcon}`;
		const paddedfirstDayIconCode = firstDayIconCode.padStart(2, '0');
		const firstDayIconLink = `https://developer.accuweather.com/sites/default/files/${paddedfirstDayIconCode}-s.png`;
		firstDayIcon.src = firstDayIconLink;
		firstDayMinTemp.textContent = `${Math.floor(
			accuWeatherData.firstDayMinTempC
		)}`;
		firstDayMaxTemp.textContent = `${Math.ceil(
			accuWeatherData.firstDayMaxTempC
		)}`;
		firstDayChanceOfRain.innerHTML = `Chance of rain: <span class="weather-value">${accuWeatherData.firstDayChanceOfRain}%</span> `;
		firstDayWind.innerHTML = `Wind: <span class="weather-value">${accuWeatherData.firstDayWindKmh} km/h</span> `;
		firstDayAirQuality.innerHTML = `Air quality: <span class="weather-value">${accuWeatherData.firstDayAirQuality}</span> `;

		//Second day
		secondDayDate.textContent = formatDate(accuWeatherData.secondDayDate);
		secondDayDescription.textContent = `${accuWeatherData.secondDayIconPhrase}`;
		const secondDayIconCode = `${accuWeatherData.secondDayIcon}`;
		const paddedsecondDayIconCode = secondDayIconCode.padStart(2, '0');
		const secondDayIconLink = `https://developer.accuweather.com/sites/default/files/${paddedsecondDayIconCode}-s.png`;
		secondDayIcon.src = secondDayIconLink;
		secondDayMinTemp.textContent = `${Math.floor(
			accuWeatherData.secondDayMinTempC
		)}`;
		secondDayMaxTemp.textContent = `${Math.ceil(
			accuWeatherData.secondDayMaxTempC
		)}`;
		secondDayChanceOfRain.innerHTML = `Chance of rain: <span class="weather-value">${accuWeatherData.secondDayChanceOfRain}%</span> `;
		secondDayWind.innerHTML = `Wind: <span class="weather-value">${accuWeatherData.secondDayWindKmh} km/h</span> `;
		secondDayAirQuality.innerHTML = `Air quality: <span class="weather-value">${accuWeatherData.secondDayAirQuality}</span> `;

		//Third day
		thirdDayDate.textContent = formatDate(accuWeatherData.thirdDayDate);
		thirdDayDescription.textContent = `${accuWeatherData.thirdDayIconPhrase}`;
		const thirdDayIconCode = `${accuWeatherData.thirdDayIcon}`;
		const paddedthirdDayIconCode = thirdDayIconCode.padStart(2, '0');
		const thirdDayIconLink = `https://developer.accuweather.com/sites/default/files/${paddedthirdDayIconCode}-s.png`;
		thirdDayIcon.src = thirdDayIconLink;
		thirdDayMinTemp.textContent = `${Math.floor(
			accuWeatherData.thirdDayMinTempC
		)}`;
		thirdDayMaxTemp.textContent = `${Math.ceil(
			accuWeatherData.thirdDayMaxTempC
		)}`;
		thirdDayChanceOfRain.innerHTML = `Chance of rain: <span class="weather-value">${accuWeatherData.thirdDayChanceOfRain}%</span> `;
		thirdDayWind.innerHTML = `Wind: <span class="weather-value">${accuWeatherData.thirdDayWindKmh} km/h</span> `;
		thirdDayAirQuality.innerHTML = `Air quality: <span class="weather-value">${accuWeatherData.thirdDayAirQuality}</span> `;
	}
}

setInterval(updateLocalTime, 1000);

dialogCloseButton.addEventListener('click', () => {
	dialog.style.animationName = 'close-dialog-animation';
	setTimeout(() => {
		dialog.style.display = 'none';
		dialog.close();
	}, 800);
});

;// CONCATENATED MODULE: ./src/index.js



const search = document.getElementById('search');
const searchButton = document.getElementById('submit');

window.addEventListener('load', () => {
	displayWeatherData('London');
});

search.addEventListener('keydown', (event) => {
	if (event.key === 'Enter') {
		event.preventDefault();
		displayWeatherData(search.value);
	}
});

searchButton.addEventListener('click', (event) => {
	event.preventDefault();
	displayWeatherData(search.value);
});

//Weather API
async function getWeatherData(city) {
	try {
		const URLForecast = `https://api.weatherapi.com/v1/forecast.json?key=db3786a3cf584fe79e3181744230812&q=${city}&days=3`;
		const response = await fetch(URLForecast, {
			mode: 'cors',
		});

		const data = await response.json();
		return data;
	} catch (error) {
		console.error(`Failed to fetch data from WeatherAPI. ${error}`);
	}
}

async function createDataObject(city) {
	try {
		const data = await Promise.resolve(getWeatherData(city));

		const dataObject = {};

		dataObject.weatherFor = data.location.name;
		dataObject.country = data.location.country;
		dataObject.todayDate = data.forecast.forecastday[0].date;
		dataObject.isDayAtTheMoment = data.current.is_day;
		dataObject.todayIcon = data.current.condition.icon;
		dataObject.currentCondition = data.current.condition.text;
		dataObject.currentTempC = data.current.temp_c;
		dataObject.currentTempF = data.current.temp_f;
		dataObject.todayAverageC = data.forecast.forecastday[0].day.avgtemp_c;
		dataObject.todayAverageF = data.forecast.forecastday[0].day.avgtemp_f;
		dataObject.todayMinTempC = data.forecast.forecastday[0].day.mintemp_c;
		dataObject.todayMaxTempC = data.forecast.forecastday[0].day.maxtemp_c;
		dataObject.todayMinTempF = data.forecast.forecastday[0].day.mintemp_f;
		dataObject.todayMaxTempF = data.forecast.forecastday[0].day.maxtemp_f;
		dataObject.todayChanceOfRain =
			data.forecast.forecastday[0].day.daily_chance_of_rain;
		dataObject.todayChanceOfSnow =
			data.forecast.forecastday[0].day.daily_chance_of_snow;
		dataObject.currentWindKph = data.current.wind_kph;
		dataObject.currentWindMph = data.current.wind_mph;
		dataObject.currentWindDirection = data.current.wind_dir;
		dataObject.todayHumidity = data.current.humidity;
		dataObject.todayMoonPhase =
			data.forecast.forecastday[0].astro.moon_phase;

		return dataObject;
	} catch (error) {
		console.error(
			`Failed to get data from getWeatherData function. ${error}`
		);
		return null;
	}
}

//AccuWeatherAPI
async function getAccuWeatherData(city) {
	try {
		const cityDataResponse = await fetch(
			`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=fA2RszmJkC0x4zPgSzDVDQ5HfNOxwPzu&q=${city}&details=true&alias=always`,
			{
				mode: 'cors',
			}
		);
		const cityData = await cityDataResponse.json();
		const locationKey = cityData[0].Key;

		const forecastResponse = await fetch(
			`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=fA2RszmJkC0x4zPgSzDVDQ5HfNOxwPzu&details=true&metric=true`,
			{
				mode: 'cors',
			}
		);
		const forecastData = await forecastResponse.json();

		const currentWeatherResponse = await fetch(
			`http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=fA2RszmJkC0x4zPgSzDVDQ5HfNOxwPzu&details=true`,
			{
				mode: 'cors',
			}
		);
		const currentWeatherData = await currentWeatherResponse.json();

		return { cityData, forecastData, currentWeatherData };
	} catch (error) {
		console.error(`Failed to fetch data from AccuWeatherAPI. ${error}`);
	}
}

async function createAccuWeatherDataObject(city) {
	try {
		const data = await Promise.resolve(getAccuWeatherData(city));

		const accuWeatherObject = {};

		accuWeatherObject.timeZone = data.cityData[0].TimeZone.Name;

		//Forecast for today and current conditions
		accuWeatherObject.todayDate = data.forecastData.DailyForecasts[0].Date;
		accuWeatherObject.currentWeatherIcon =
			data.currentWeatherData[0].WeatherIcon;
		accuWeatherObject.todayIconPhrase =
			data.forecastData.DailyForecasts[0].Day.IconPhrase;
		accuWeatherObject.todayShortPhrase =
			data.forecastData.DailyForecasts[0].Day.ShortPhrase;
		accuWeatherObject.todayLongPhrase =
			data.forecastData.DailyForecasts[0].Day.LongPhrase;
		accuWeatherObject.todayAirQuality =
			data.forecastData.DailyForecasts[0].AirAndPollen[0].Category;
		accuWeatherObject.currentUvIndex =
			data.currentWeatherData[0].UVIndexText;
		accuWeatherObject.currentConditions =
			data.currentWeatherData[0].WeatherText;

		//Forecast
		//First day data
		accuWeatherObject.firstDayDate =
			data.forecastData.DailyForecasts[1].Date;
		accuWeatherObject.firstDayIcon =
			data.forecastData.DailyForecasts[1].Day.Icon;
		accuWeatherObject.firstDayMinTempC =
			data.forecastData.DailyForecasts[1].Temperature.Minimum.Value;
		accuWeatherObject.firstDayMaxTempC =
			data.forecastData.DailyForecasts[1].Temperature.Maximum.Value;
		accuWeatherObject.firstDayChanceOfRain =
			data.forecastData.DailyForecasts[1].Day.PrecipitationProbability;
		accuWeatherObject.firstDayWindKmh =
			data.forecastData.DailyForecasts[1].Day.Wind.Speed.Value;
		accuWeatherObject.firstDayAirQuality =
			data.forecastData.DailyForecasts[1].AirAndPollen[0].Category;
		accuWeatherObject.firstDayIconPhrase =
			data.forecastData.DailyForecasts[1].Day.IconPhrase;
		accuWeatherObject.firstDayShortPhrase =
			data.forecastData.DailyForecasts[1].Day.ShortPhrase;

		//Second day data
		accuWeatherObject.secondDayDate =
			data.forecastData.DailyForecasts[2].Date;
		accuWeatherObject.secondDayIcon =
			data.forecastData.DailyForecasts[2].Day.Icon;
		accuWeatherObject.secondDayMinTempC =
			data.forecastData.DailyForecasts[2].Temperature.Minimum.Value;
		accuWeatherObject.secondDayMaxTempC =
			data.forecastData.DailyForecasts[2].Temperature.Maximum.Value;
		accuWeatherObject.secondDayChanceOfRain =
			data.forecastData.DailyForecasts[2].Day.PrecipitationProbability;
		accuWeatherObject.secondDayWindKmh =
			data.forecastData.DailyForecasts[2].Day.Wind.Speed.Value;
		accuWeatherObject.secondDayAirQuality =
			data.forecastData.DailyForecasts[2].AirAndPollen[0].Category;
		accuWeatherObject.secondDayIconPhrase =
			data.forecastData.DailyForecasts[2].Day.IconPhrase;
		accuWeatherObject.secondDayShortPhrase =
			data.forecastData.DailyForecasts[2].Day.ShortPhrase;

		//Third day data
		accuWeatherObject.thirdDayDate =
			data.forecastData.DailyForecasts[3].Date;
		accuWeatherObject.thirdDayIcon =
			data.forecastData.DailyForecasts[3].Day.Icon;
		accuWeatherObject.thirdDayMinTempC =
			data.forecastData.DailyForecasts[3].Temperature.Minimum.Value;
		accuWeatherObject.thirdDayMaxTempC =
			data.forecastData.DailyForecasts[3].Temperature.Maximum.Value;
		accuWeatherObject.thirdDayChanceOfRain =
			data.forecastData.DailyForecasts[3].Day.PrecipitationProbability;
		accuWeatherObject.thirdDayWindKmh =
			data.forecastData.DailyForecasts[3].Day.Wind.Speed.Value;
		accuWeatherObject.thirdDayAirQuality =
			data.forecastData.DailyForecasts[3].AirAndPollen[0].Category;
		accuWeatherObject.thirdDayIconPhrase =
			data.forecastData.DailyForecasts[3].Day.IconPhrase;
		accuWeatherObject.thirdDayShortPhrase =
			data.forecastData.DailyForecasts[3].Day.ShortPhrase;

		return accuWeatherObject;
	} catch (error) {
		console.log(
			`Failed to get data from getAccuWeatherData function. ${error}`
		);
		return null;
	}
}

/******/ })()
;
//# sourceMappingURL=main.js.map