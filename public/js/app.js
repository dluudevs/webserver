console.log('Client side JavaScript is loaded')

const weatherForm = document.querySelector('form');
const search = document.querySelector('input')

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // fetch is a browser api. JavaScript runs in browser, but node doesnt (hence we need request)
  fetch(`/weather?address=${search.value}`).then(res => {
    res.json().then(data => {
      if (data.error){
        return console.log(data.error)
      }

      console.log(data.location)
      console.log(data.forecast)
    })
  })
})