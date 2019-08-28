const geoCode = require('./utils/geoCode')
const forecast = require('./utils/forecast')

const address = process.argv[2]

if (address == null) {
    console.log('Please Provide a location')
} else {
    geoCode(address, function (error, data) {

        if (error) {
            console.log(error)

        } else {
            forecast(data.latitude, data.longitude, function (err, forecastData) {
                if (err) {
                    console.log(err)
                } else {
                    console.log(data.location + '\n' + forecastData)
                }
            })
        }
    })
}