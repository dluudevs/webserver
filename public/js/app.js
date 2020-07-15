const weatherForm = document.querySelector('form');
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const userLocation = document.querySelector('#user-location')

const showErrorMessage = (error) => {
  messageOne.textContent = error
}

const showLoadingMessage = () => {
  messageOne.textContent = 'Loading...'
  messageTwo.textContent = ''
}

const showDataMessage = (location, forecast) => {
  messageOne.textContent = location
  messageTwo.textContent = forecast
}

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // fetch is a browser api. JavaScript runs in browser, but node doesnt (hence we need request)
  showLoadingMessage()
  
  fetch(`/weather?address=${search.value}`).then(res => {
    res.json().then(({ error, location, forecast }) => {
      if (error){
        return showErrorMessage(error)
      }
      showDataMessage(location, forecast)
    })
  })
})

userLocation.addEventListener('click', () => {
  if (!navigator.geolocation){
    return messageOne.textContent = 'Your browser does not support this functionality'
  }
  
  navigator.geolocation.getCurrentPosition((position) => {
    const { latitude, longitude } = position.coords
    showLoadingMessage()

    fetch(`/weather?coords=${latitude},${longitude}`)
      .then(res => res.json()).then(({ error, location, forecast }) => {
        if (error){
          return showErrorMessage(error)
        }
        showDataMessage(location, forecast)
    })
  })
})
