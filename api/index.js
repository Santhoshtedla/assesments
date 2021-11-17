const express=require('express')
const router=express.Router()
require('./routes/registration')(router)
require('./routes/todo')(router)
require('./routes/sub')(router)
module.exports=router
