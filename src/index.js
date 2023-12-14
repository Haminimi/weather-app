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
