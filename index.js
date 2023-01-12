const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')

const images = require('./routes/images')
const user = require('./routes/user')

const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors())
app.use(morgan('dev'))

app.use('/results', express.static(__dirname + '/results'));

app.use('/images', images)
app.use('/user', user )

app.listen(port, ()=>{
    console.log('App corriendo en el puerto ' + port);
})