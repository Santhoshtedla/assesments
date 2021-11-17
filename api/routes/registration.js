require("dotenv").config();
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var users = require('../../schemas/user');
const mailer=require('../routes/mailer')

module.exports = function (router) {
    router.post('/', async (req,res) => {
        try{
            const record = req.body;
            const existingUser = await users.findOne({email: req.body.email});
            if(existingUser){
                return res.send("User already exists. Please login");
            }
            const newUser = await users.create(record)
            const email = req.body.email;
            const userName=req.body.userName;
            await mailer(userName,email)
            res.send('please check your mail ');

        }catch(err){
            res.send(err)
        }
    })


    router.get('/users', async (req,res) => {
        try{
            const getData = await users.find({})
            res.send(getData)
        }catch(err){
            res.send(err)
        }
    })
    
    router.post('/login',async(req,res)=>{
        try{
            const credentials=req.body;
        const getcredentials = await users.find(
            {"email" : `${loginDetails.email}`,
        "password" : `${loginDetails.password}`}
        )
        if(!getcredentials)
        res.send('Incorrect gmail or password!!!')
        else
        res.send('Login successful')
        }
        catch(err)
        {
            res.send(err);
        }

    })

    router.delete('/deleteAccount/:_id', async(req,res) => {
        try{
            const user = req.params._id
            const deleteAccount = await users.deleteOne(
                {"_id" : `${user}`}
            )
            res.send('Account deleted')
        }catch(err){
            res.send(err)
        }
    })
    
    module.exports = router
    

}