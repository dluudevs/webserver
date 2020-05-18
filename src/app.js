// path is a core module (comes out of the box with node)
const path = require('path')
// express is a framework (npm module) that uses node to make the develop of web servers a lot easier / faster
// currently in this example we are using a web server to server HTML, however it can also be used to server a HTTP JSON API
const express = require('express')

// express is a function
// configure server using objects on returned value
const app = express()
const publicDirectoryPath = path.join(__dirname,'../public')

// this method lets express know which templating engine is installed
// method sets value for given express setting - here we are setting up the view engine as hbs (name of the module)
// express will expect a folder called views in the root folder 
app.set('view engine', 'hbs')

// use method customizes the server - here we are customizing the server to serve the public folder
// returned value of express.static is passed to use. static method takes the absolute path to the folder the server needs to serve
// pointing to this folder will automatically serve index.html (if the file exists)
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  // render method will render one of our views (a file that is using the view engine)
  // string passed just needs to match the name of the file inside of the view folder
  // second value is object that can be accessed by the view
  res.render('index', {
    title: 'Weather',
    name: 'Derek'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Derek'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    helpText: 'This is some helpful text'
  })
})

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

