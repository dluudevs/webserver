const request = require('request')

const reverseGeocode = (latitude, longitude) => (
  new Promise((resolve, reject) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=pk.eyJ1IjoiZGVsdnYiLCJhIjoiY2szejRmdHFjMWUyajNlcGRwb2dncml0aSJ9.BjzlJbeyH4qtVzr8ns9gDA&limit=1`
    request({ url, json: true }, (error, response) => {
      const { features } = response.body
      if(error){
        reject(error)
      } else {
        resolve(features[0].place_name)
      }
    })
  })
)

module.exports = reverseGeocode