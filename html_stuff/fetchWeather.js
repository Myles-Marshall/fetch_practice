const latitudeDisplay = document.getElementById("latitude");
const longitudeDisplay = document.getElementById("longitude");

function geolocationSuccess(position) {
    latitudeDisplay.textContent = position.coords.latitude;
    longitudeDisplay.textContent = position.coords.longitude;
}

navigator.geolocation.getCurrentPosition(geolocationSuccess);

async function getWeatherData() {
    const latitude = document.getElementById("latitude").textContent;
    const longitude = document.getElementById("longitude").textContent;

    const weatherAPI = `https://api.weather.gov/points/${latitude},${longitude}`

    try {
        const response = await fetch(weatherAPI);

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const weatherJSON = await response.json();
        getForecast(weatherJSON.properties)
    } catch (error) {
        console.log(error.message)
    }
}

async function getForecast(data) {
    // console.log(data)
    const forecastAPI = `${data.forecast}`;
    let forecastData;

    try {
        const response = await fetch(forecastAPI);

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const forecastJSON = await response.json();
        forecastData = forecastJSON.properties;
        // console.log(forecastJSON);
    } catch (error) {
        console.log(error.message);
    }

    const locationDisplay = document.getElementById("location");
    locationDisplay.textContent = `Approx. Location: ${data.relativeLocation.properties.city}, ${data.relativeLocation.properties.state}`;

    const forecastContainer = document.getElementById("forecast-contain");
    
    forecastData.periods.forEach((period) => {
        console.log(period);

        const div = document.createElement("div");
        div.style.display = "inline-block"
        div.style.textAlign = "center";
        div.style.width = "100%";
        document.body.appendChild(div)

        const periodHeader = document.createElement("h1")
        periodHeader.textContent = period.name
        periodHeader.style.width = "100%";
        
        const temperature = document.createElement("h2")
        temperature.textContent = `${period.temperature}°${period.temperatureUnit}`;

        const detailedForecast = document.createElement("p");
        detailedForecast.textContent = period.shortForecast;

        const precipitation = document.createElement("p")
        precipitation.textContent = `Precipitation: ${period.probabilityOfPrecipitation.value}%`

        const windDirection = document.createElement("p");
        const windSpeed = document.createElement("p");
        windDirection.textContent = `Wind Direction: ${period.windDirection}`;
        windSpeed.textContent = `Wind Speed: ${period.windSpeed}`;
        
        div.appendChild(periodHeader)
        div.appendChild(temperature)
        div.appendChild(detailedForecast)
        div.appendChild(precipitation)
        div.appendChild(windDirection)
        div.appendChild(windSpeed)
    })
}