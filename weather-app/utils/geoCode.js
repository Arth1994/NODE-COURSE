const request = require('request')

const geoCode = function (address, callback) {
    const geoCodeUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiYXJ0aDEwMzIiLCJhIjoiY2p6b2hxY3cyMDBxYTNpbWIydHMybGZ5eCJ9.NO4kvcj5VWCwiGd1j7ecWQ"

    request({ url: geoCodeUrl, json: true }, function (error, response) {

        if (error) {
            callback('Unable to connect to location services', undefined)
        } else if (response.body.features.length == 0) {
            callback('Unable to find location', undefined);
        } else{
            callback(undefined, {
                latitude : response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode
