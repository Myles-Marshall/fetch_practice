const latitudeDisplay = document.getElementById("latitude");
const longitudeDisplay = document.getElementById("longitude");

function geolocationSuccess(position) {
    latitudeDisplay.textContent = position.coords.latitude;
    longitudeDisplay.textContent = position.coords.longitude;
}

navigator.geolocation.getCurrentPosition(geolocationSuccess);

async function getWeatherData() {
    const latitudeDisplay = document.getElementById("latitude");
    const longitudeDisplay = document.getElementById("longitude");

    const weatherAPI = `https://api.weather.gov/points/${latitudeDisplay.textContent},${longitudeDisplay.textContent}`
    // const weatherAPI = `https://api.weather.gov/points/34.890785,-82.541262`

    try {
        const response = await fetch(weatherAPI);

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const weatherDataJson = await response.json();
        console.log(weatherDataJson)
        getForecast(weatherDataJson);
    } catch(error) {
        console.log(error.message)
    }
}

async function getForecast(weatherData) {
    const forecastAPI = weatherData.properties.forecast;
    console.log(forecastAPI)

    try {
        const response = await fetch(forecastAPI);

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const forecastJson = await response.json()
        console.log(forecastJson)
    } catch(error) {
        console.log(error.message);
    }
}