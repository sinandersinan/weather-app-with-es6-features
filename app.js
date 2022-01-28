import * as ELEMENTS from './elements.js'
import {Http} from 'http.js'

ELEMENTS.ELEMENT_SEARCH_BUTTON.addEventListener('click', searchWeather);
const API_KEY = '511282323cccd7b2a571fa0520912f63';

function searchWeather() {
    const CITY_NAME = ELEMENTS.ELEMENT_SEARCHED_CITY.value.trim()
    if (CITY_NAME.length === 0) {
        return alert('Please enter a city name')
    }
    const URL = `http://api.openweathermap.org/data/2.5/weather?q=${CITY_NAME}&appid=${API_KEY}`
    Http.fetchData(URL)
        .then((response) => {
            console.log(response)
        })
        .catch(console.error)
}
