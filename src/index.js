import './style.css';
import displayWeatherData from './display';

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

export default async function createDataObject(city) {
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
			`https://dataservice.accuweather.com/locations/v1/cities/search?apikey=fA2RszmJkC0x4zPgSzDVDQ5HfNOxwPzu&q=${city}&details=true&alias=always`,
			{
				mode: 'cors',
			}
		);
		const cityData = await cityDataResponse.json();
		const locationKey = cityData[0].Key;

		const forecastResponse = await fetch(
			`https://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=fA2RszmJkC0x4zPgSzDVDQ5HfNOxwPzu&details=true&metric=true`,
			{
				mode: 'cors',
			}
		);
		const forecastData = await forecastResponse.json();

		const currentWeatherResponse = await fetch(
			`https://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=fA2RszmJkC0x4zPgSzDVDQ5HfNOxwPzu&details=true`,
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

export async function createAccuWeatherDataObject(city) {
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
