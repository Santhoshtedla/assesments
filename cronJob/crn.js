/*
var mailer = require('../api/routes/mailer')
var users = require('../schemas/user');
const cron=require("node-cron");
const axios=require('axios')

var category = require('../schemas/category')
var subItems = require('../schemas/product')


async function mail(){
    try{
    console.log('1')
    await axios.get('http://localhost:3000/api/userss',(err,user)=>{
        if(err) console.log(err)   
        console.log(user) 

        console.log('3')
    for(let i=0;i<user.length;i++){
        console.log('4')
        let u_id=user[i]._id;
        let cats=await category.find({userId:u_id}).select({ "title": 1, "_id": 0});
        let subs=await subItems.find({userId:u_id}).select({ "productName": 1,"cost":1, "_id": 0});
        let email=user[i].email;
        let userName=user[i].userName;
        let text=`Hi ${userName} , please check your checklist ....categories are: `+cats+" sub items are: "+subs+"...."
        console.log(email+" "+userName)
         mailer(userName,email,text)
     }
    console.log('done') 
    })
})
}
catch(error){
    console.log(error)
}
}
module.exports=mail()
*/