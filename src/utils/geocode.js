const request = require('request')

const geocode = (address) => (
  new Promise((resolve, reject) => {
    // encodeURIComponent (JavaScript function) encodes special characters so that they can be queried
    // eg., '?' would crash the app, encoder would encode it to '%3F'
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZGVsdnYiLCJhIjoiY2szejRmdHFjMWUyajNlcGRwb2dncml0aSJ9.BjzlJbeyH4qtVzr8ns9gDA&limit=1`
    request({ url: url, json: true }, (error, response) => {
      const { features } = response.body
      if(error){
        reject('Unable to connect to location services')
      } else if (!features.length){
        reject('Unable to find location. Try another search')
      } else {
        const [ longitude, latitude ] = features[0].center
        resolve({ 
          longitude,
          latitude,
          location: features[0].place_name
        })
      }
    })
  })
)

module.exports = geocode