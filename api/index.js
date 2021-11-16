const express=require('express')
const router=express.Router()
//require('../routes/crud')(router)
require('./routes/registration')(router)
module.exports=router


