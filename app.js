import * as ELEMENTS from './elements.js'
import {Http} from 'http.js'
import {WeatherData} from "./weather-data.js";
import {WEATHER_DATA_PROXY_HANDLER} from "./weather-data-proxy-handler.js";

const API_KEY = 'use your own created key on ';

ELEMENTS.ELEMENT_SEARCH_BUTTON.addEventListener('click', searchWeather);

function searchWeather() {
    const CITY_NAME = ELEMENTS.ELEMENT_SEARCHED_CITY.value.trim()
    if (CITY_NAME.length === 0) {
        return alert('Please enter a city name')
    }
    //some css coding via javascript
    ELEMENTS.ELEMENT_LOADING_TEXT.style.display = 'block';
    ELEMENTS.ELEMENT_WEATHER_BOX.style.display = 'none';

    // dont forget to set the units in metric, otherwise Calvin would have been used for calculating not Celsius
    const URL = `http://api.openweathermap.org/data/2.5/weather?q=${CITY_NAME}&units=metric&appid=${API_KEY}`
    Http.fetchData(URL)
        .then((responseData) => {
            // proxy the data we fetched (temperature is missing)
            const WEATHER_DATA = new WeatherData(CITY_NAME, responseData.weather[0].description);
            const WEATHER_PROXY = new Proxy(WEATHER_DATA, WEATHER_DATA_PROXY_HANDLER);
            WEATHER_PROXY.temperature = responseData.main.temp;
            displayWeatherDataOnHTML(WEATHER_PROXY);
        })
        .catch(console.error)
}

function displayWeatherDataOnHTML(proxiedWeatherData) {
    ELEMENTS.ELEMENT_WEATHER_CITY.textContent = proxiedWeatherData.name;
    ELEMENTS.ELEMENT_WEATHER_DESCRIPTION.textContent = proxiedWeatherData.description;
    ELEMENTS.ELEMENT_WEATHER_TEMPERATUR.textContent = proxiedWeatherData.temperature;
    // some css coding via javascript
    ELEMENTS.ELEMENT_LOADING_TEXT.style.display = 'none';
    ELEMENTS.ELEMENT_WEATHER_BOX.style.display = 'block';
}
