const request = require('request')

const forecast = (latitude, longitude) => (
  new Promise((resolve, reject) => {
    const url = `http://api.weatherstack.com/current?access_key=47199bc362cf473b97d334e5179d307b&query=${latitude},${longitude}&units=m`
    // first argument is options object, url must be provided
    // json option converts data to json without having to use JSON.parse()
    request({ url, json: true }, (error, { body }) => {
      // error only gets passed to callback when network request fails. this is called a low level error
        if (error){
          reject('Unable to connect to weather service!')
        } else if (body.error){
          reject('Unable to find location')
        } else {
          const weather = body.current
          resolve(`${weather.weather_descriptions[0]}. The temperature is ${weather.temperature}°C, it feels like ${weather.feelslike}°C. The humidity is ${weather.humidity}%`)
        }
    })
  })
)

module.exports = forecast