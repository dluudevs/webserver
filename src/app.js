// express is a framework that uses node to make the develop of web servers a lot easier / faster
// currently in this example we are using a web server to server HTML, however it can also be used to server a HTTP JSON API
const express = require('express')

// express is a function
// configure server using objects on returned value
const app = express()

// route and function as arguments. function describes what gets sent to the user when this route is visited 
// blank implies root level of website
// req - request object ; res - res - methods to send requester
app.get('', (req, res) => {
  res.send('Hello express!')
})

app.get('/help', (req, res) => {
  res.send('Help page')
})

app.get('/about', (req, res) => {
  res.send('About page')
})

app.get('/weather', (req, res) => {
  res.send('Weather page')
})

// starts up server and listens on specific port
// use nodemon to run server to have server restart when files are updated
app.listen(3000, () => {
  console.log('Server is up on port 3000')
})

