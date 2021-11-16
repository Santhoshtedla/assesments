const express=require('express')
const app=express()
const api=require('./api')
var jsonwebtoken = require("jsonwebtoken");

app.set('port',(process.env.PORT||8081))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/api',api)

//  MongoDB connection 
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/todoDb', { useNewUrlParser: true })

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
	console.log('Connected to MongoDB')
	app.listen(app.get('port'), function () {
		console.log('API Server Listening on port ' + app.get('port') + '!')
	})
})

module.exports = app;