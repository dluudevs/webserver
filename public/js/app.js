console.log('Client side JavaScript is loaded')

// fetch is a browser api. JavaScript runs in browser, but node doesnt (hence we need request)
  fetch(' /weather?address=Markham').then(res => {
    res.json().then(data => {
      if (data.error){
        return console.log(data.error)
      }

      console.log(data.location)
      console.log(data.forecast)
    })
  })