const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geoCode')
const forecast = require('./utils/forecast')

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
        title: "Help",
        name: "Arth Shah",
        message: "What Can I help you with?"
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address"
        })
    }
    //res.send({ forecast: 95 + "F", location: "Dallas", address : req.query.address })
    geoCode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast : forecastData,
                location,
                address : req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        })
    }

    res.send({
        products: [{

        }]
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: "Error 404",
        name: "Arth Shah",
        message: "Help Article Not Found"
    })
})

app.get('*', function callback(req, res) {
    res.render('error', {
        title: "Error 404",
        name: "Arth Shah",
        message: "Page Not Found"
    })
})


app.listen(3000, function callback() {
    console.log('Server is on port 3000')
})
