const request = require('request')
const chalk = require('chalk')

const forecast = (latitude,longitude, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=2ea1a66a8fb95cdb242e65a8716883f8&query=' + latitude + ',' + longitude + '&units=f'

    request({url, json:true},(error,{body}) => {
        if(error){
            callback('Unable to connect to weather service!', undefined)
        } else if(body.error) {
            callback(chalk.red('Unable to find location'), undefined)
        } else {
            callback(undefined, body.current.weather_descriptions + '. It is currently '+ body.current.temperature + ' degress out. There is a ' + body.current.precip + '% chance of rain.')
        }
    })   
}

module.exports = forecast