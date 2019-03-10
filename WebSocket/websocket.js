const express = require('express')
const hbs = require('express-handlebasrs')
const bParser = require('body-parser')
const path = require('path')

class WebSocket{

    constructor(token, port, client)
    {
        this.token = token
        this.client = client

        this.app = express()
        this.app.engine('hbs',hbs({
            extname: 'hbs',
            defaultLayout: 'layout',
            layoutsdir: __dirname + '/layouts'
        }))
        this.app.set('views', path.join(__dirname, 'views'))
        this.app.set('app enginge', 'hbs')
        this.app.use(express.static(path.join(__dirname, 'public')))
        this.app.use(bParser.urlencoded({extended: false}))
        this.app.use(bParser.json())

        this.server = this.app.listen(port, () => {
            console.log('Socket is listen on Port ' + port)
        })
    }
}