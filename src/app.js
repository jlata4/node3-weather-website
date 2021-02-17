const path = require('path')
const express = require('express')
const hbs = require('hbs')
const chalk = require('chalk')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()

const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=> {
    res.render('index', {
        message: 'Hello Express!!',
        title: 'HOME',
        author: 'Juhi Lata'
    })
})

app.get('/help',(req,res)=> {
    res.render('help', {
        message: 'Happy to help you!',
        title: 'HELP',
        author: 'Juhi Lata'
    })
})

app.get('/about',(req,res)=> {
    res.render('about',{
        title: 'ABOUT',
        author: 'Juhi Lata'
    })
})

app.get('/weather',(req,res)=> {
    console.log(req.query.address)

    
    if(!req.query.address){
        return res.send([{
            error: 'Please provide an address!'
        }])
    } 
        // res.send([{
        //     forecast: 'Cloudy',
        //     location: req.query.address
        // }])
        geocode(req.query.address,(error,{latitude,longitude, location} = {}) => {
            if(error){
                return res.send({error})
            }
            forecast(latitude, longitude,(error, forecastData) => {
                if(error){
                    return res.send({error})
                }    
                res.send([{
                         forecast: forecastData,
                         location,
                         address: req.query.address
                     }])
            })
        })
    // res.render('weather',{
    //     title: 'WEATHER',
    //     author: 'Juhi Lata'
    // })
})

app.get('/help/*',(req,res) => {
    res.render('error', {
        title: 'ERROR PAGE',
        message: 'Help article not found',
        author: 'Juhi lata'   
    })
})

app.get('*',(req,res) => {
    res.render('error', {
        title: 'ERROR PAGE',
        message: 'Page not found',
        author: 'Juhi Lata'
    })
})

app.listen(3000, () => {
    console.log('Server is up on Port 3000.')
})

