const request = require('request')
const chalk = require('chalk')

const forecast = (latitude,longitude, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=2ea1a66a8fb95cdb242e65a8716883f8&query=' + latitude + ',' + longitude + '&units=f'

    request({url, json:true},(error,{body} = {}) => {
        if(error){
            callback('Unable to connect to mapbox api!!', undefined)
        } else if(body.error) {
            callback(chalk.red('Incorrect parameters in url!!'), undefined)
        } else {
            callback(undefined, 'It is currently '+ body.current.temperature + ' out and feels like ' + body.current.feelslike)
        }
    })   
}

module.exports = forecast