// *** to run nodemon src/app.js -e js,hbs 
// -e flag stands for extension, nodemon will now restart the server when js and hbs files are saved

// path is a core module (comes out of the box with node)
const path = require('path')
// express is a framework (npm module) that uses node to make the develop of web servers a lot easier / faster
// currently in this example we are using a web server to server HTML, however it can also be used to server a HTTP JSON API
const express = require('express')
// require hbs to setup partials (partials is a small portion of code)
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const reverseGeocode = require('./utils/reverseGeocode')

// express is a function
// configure server using objects on returned value
const app = express()
// heroku sets environment variable in port. if environment variable not available (not running on heroku), use port 3000 (dev)
const port = process.env.PORT || 3000
// define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// this method lets express know which templating engine is installed
// method sets value for given express setting - here we are setting up the view engine as hbs (name of the module)
// express will expect a folder called views in the root folder 
// set can be thought of as a way to store variables
app.set('view engine', 'hbs')
// set up views path (the various pages)
app.set('views', viewsPath)
// sets up partials path for hbs
hbs.registerPartials(partialsPath)

// use method customizes the server - here we are customizing the server to serve the public folder 
// customize server through the use of middleware
// returned value of express.static is passed to use. static method takes the absolute path to the static directory the server needs to serve
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
    helpText: 'This is some helpful text',
    title: 'Help',
    name: 'Derek'
  })
})

// route and function as arguments. function describes what gets sent to the user when this route is visited 
// blank implies root level of website
// req - request object ; res - res - methods to send requested
// App.use can serve a specific folder based on the path (of website) a user is visiting (if you're only serving static content)
app.get('/weather', async (req, res) => {
  // In any given get method, you can only call the send method on response once. (In this situation if the cobndition is met, function stops running so we're fine) Otherwise you'll get an error like 
  // "Cannot set headers after they are sent to the client"

  // req.query is an object that contains query string information
  // the request is made in the client side js file 
  // once this route is requested, the callback function runs. It can vary from rendering a view or running a program
  const address = req.query.address
  const coords = req.query.coords

  if (!address && !coords){
    return res.send({
      error: "No address or location provided"
    })
  }

  // what would this look like if the callback to the get method is an async function
  if (address){
    try {
      const { longitude, latitude, location } = await geocode(address)
      const forecastData = await forecast(latitude, longitude)
      
      res.send({
        forecast: forecastData,
        location,
        address
      })
    } catch (error) {
      res.send({ error })
    }  
  }

  if (coords){
    const [ latitude, longitude ] = coords.split(',')
    try {
      const location = await reverseGeocode(latitude, longitude)
      const forecastData = await forecast(latitude, longitude)
      
      res.send({ forecast: forecastData, location })
    } catch (error) {
      res.send({ error })
    }
  }
})

// for any paths that start with /help that do not exist
app.get('/help/*', (req, res) => {
  res.render('404', {
    name: 'Derek',
    errorMessage: 'Help article not found'
  })
})

// * is a wild card that matches everything else not matched so far in the above get methods
// express looks for the path synchronously therfore the 404 page must be the last get method
app.get('*', (req, res) => {
  res.render('404', {
    name: 'Derek',
    errorMessage: 'Page not found'
  })
})

// starts up server and listens on specific port
app.listen(port, () => {
  console.log('Server is up on port: ' + port)
})

