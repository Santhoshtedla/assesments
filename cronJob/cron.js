var mailer = require('../api/routes/mailer')
var users = require('../schemas/user');
let cron=require("node-cron");

var category = require('../schemas/category')
var subItems = require('../schemas/product')


module.exports=function(router){

router.get('/cron', async (req,res)=>{
    const user=await users.find({})

    cron.schedule('*/5 * * * * * ',async()=>{
    for(let i=0;i<user.length;i++){
        let u_id=user[i]._id;
        let cats=await category.find({userId:u_id}).select({ "title": 1, "_id": 0});
        let subs=await subItems.find({userId:u_id}).select({ "productName": 1,"cost":1, "_id": 0});
        let email=user[i].email;
        let userName=user[i].userName;
        let text=`Hi ${userName} , please check your checklist ....categories are: `+cats+" sub items are: "+subs+"...."
        console.log(email+" "+userName)
         mailer(userName,email,text)
     }
    res.send('done') 
    })
})
}

