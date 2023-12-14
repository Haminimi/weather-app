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
