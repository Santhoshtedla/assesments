const express=require('express')
const router=express.Router()
require('./routes/registration')(router)
require('./routes/categories')(router)
require('./routes/products')(router)
require('../cronJob/cron')(router)
require('./routes/todolist')(router)
module.exports=router
