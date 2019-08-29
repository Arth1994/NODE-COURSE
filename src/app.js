const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partialsPath)



//Setup handlebars & Views location
app.set('views', viewPath)
app.set('view engine', 'hbs')

//serve static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather Application",
        name: "Arth Shah"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Me",
        name: "Arth Shah"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: "What Can I help you with?"
    })
})

app.get('/weather', (req, res) => {
    res.send({ forecast: 95 + "F", location: "Dallas" })
})

app.listen(3000, function callback() {
    console.log('Server is on port 3000')
})

