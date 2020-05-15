// path is a core module (comes out of the box with node)
const path = require('path')
// express is a framework (npm module) that uses node to make the develop of web servers a lot easier / faster
// currently in this example we are using a web server to server HTML, however it can also be used to server a HTTP JSON API
const express = require('express')

// express is a function
// configure server using objects on returned value
const app = express()
const publicDirectoryPath = path.join(__dirname,'../public')

// use method customizes the server - here we are customizing the server to serve the public folder
// returned value of express.static is passed to use. static method takes the absolute path to the folder the server needs to serve
app.use(express.static(publicDirectoryPath))

// route and function as arguments. function describes what gets sent to the user when this route is visited 
// blank implies root level of website
// req - request object ; res - res - methods to send requested
// *** No longer need this, because app.use can serve a specific folder based on the path (of website) a user is visiting
// *** Once express finds the path the user is visiting, it will no longer continue searching
app.get('/weather', (req, res) => {
  res.send({
    location: 'Markham Ontario, Canada',
    weather: 'The temperature is 55, it feels like 54'
  })
})

// starts up server and listens on specific port
// use nodemon to run server to have server restart when files are updated
app.listen(3000, () => {
  console.log('Server is up on port 3000')
})

