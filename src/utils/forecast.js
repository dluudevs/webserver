const request = require('request')

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=47199bc362cf473b97d334e5179d307b&query=${latitude},${longitude}&units=m`

  console.log(url)
  // first argument is options object, url must be provided
  // json option converts data to json without having to use JSON.parse()
  request({ url, json: true }, (error, { body }) => {
    // error only gets passed to callback when network request fails. this is called a low level error
    if (error){
      callback('Unable to connect to weather service!', undefined)
    // else if for situations where a response with an error is passed. ie., when no coordinates is provided to the query
    } else if (body.error) {
      callback('Unable to find location', undefined)
    } else {
      const weather = body.current
      callback(
        undefined, 
        `${weather.weather_descriptions[0]}. The temperature is ${weather.temperature}°C, it feels like ${weather.feelslike}°C. 
        The humidity is ${weather.humidity}%`
      )
    }
  })
}

module.exports = forecast