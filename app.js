const express=require('express')
const app=express()
const api=require('./api')
var jsonwebtoken = require("jsonwebtoken");

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/api',api)

//  MongoDB connection 
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/todoDb', (err) => {
    if (err) {
        console.log(error);
    }
    else
        console.log('server connected to port ' + port)
})
const port = 3000;
app.listen(port, function () {
    console.log("Running");
})



