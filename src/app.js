const path = require('path')
const express = require('express')
const hbs = require('hbs')
const chalk = require('chalk')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=> {
    res.render('index', {
        message: 'Use this site to get your weather',
        title: 'WEATHER',
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
        return res.send({
            error: 'You must enter a location!'
        })
    } 
        
    geocode(req.query.address,(error,{latitude,longitude, location} = {}) => {
        if(error){
            return res.send({error})
        }
        forecast(latitude, longitude,(error, forecastData) => {
            if(error){
                return res.send({error})
            }    
            res.send({
                        forecast: forecastData,
                        location,
                        address: req.query.address
                    })
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

app.listen(port, () => {
    console.log('Server is up on Port ' + port)
})

