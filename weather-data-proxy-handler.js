export const WEATHER_DATA_PROXY_HANDLER = {
    // simple getter which does nothing (coudl also get it from Weather Class
    get: function (target, property) {
        return Reflect.get(target,property)
    },
    // set the value of Celsius (given value from the fetched Weather data) to Fahrenheit
    set: function (target, property, value) {
        const newValue = (value * 1.8 + 32).toFixed(2) + '.F';
        return Reflect.set(target, property, newValue)
    }
}
