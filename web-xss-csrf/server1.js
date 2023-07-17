



let express = require('express')

let app = new express()
let path = require('path')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(__dirname))
let bodyParser = require('body-parser')
let cookieParser = require('cookie-parser')
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true })) // a = 1 & b=2  ==> {a:1, b:2}



app.listen(3001)