const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: { type: String },
    email: {type: String, unique: true,trim:true, required: true},
    password: {type: String,required: true},
    profile:String
})



module.exports = mongoose.model('user', userSchema)