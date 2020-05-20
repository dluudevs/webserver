console.log('Client side JavaScript is loaded')

const weatherForm = document.querySelector('form');
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // fetch is a browser api. JavaScript runs in browser, but node doesnt (hence we need request)
  messageOne.textContent = 'Loading...'
  messageTwo.textContent = ''
  
  fetch(`/weather?address=${search.value}`).then(res => {
    res.json().then(data => {
      if (data.error){
        return messageOne.textContent = data.error
      }

      messageOne.textContent = data.location
      messageTwo.textContent = data.forecast
    })
  })
})