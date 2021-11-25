var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var users = require('../../schemas/user');
var category = require('../../schemas/category')
var subItems = require('../../schemas/product')
const mailer = require('../routes/mailer')
const multer = require('multer')
require("dotenv").config();

function paginatedResults(model) {
  return async (req, res, next) => {
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)

    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    const results = {}

    if (endIndex < await model.countDocuments().exec()) {
      results.next = {
        page: page + 1,
        limit: limit
      }
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit
      }
    }
    try {
      results.results = await model.find().limit(limit).exec()
      res.paginatedResults = results
      next()
    } catch (e) {
      res.status(500).json({ message: e.message })
    }
  }
}



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './images');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "--" + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },

});

module.exports = function (router) {
  router.post("/signup", upload.single("profile"), async (req, res) => {
    try {
      let exists = await users.findOne({ email: req.body.email })
      if (exists) {
        res.json({success:true,message:'email already registered, please login'})
      }
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          return res.json({success:false,error:err})
        }
        else {
          const newUser = new users({
            userName: req.body.userName,
            email: req.body.email,
            password: hash
          });
          users.create(newUser)
          const email = req.body.email;
          const userName = req.body.userName;
          const text = `Hi ${userName} , You are Successfully Registered `
          mailer(userName, email, text)
          res.json({ sucess:true,message: 'please check your mail ' });
        }
      });

    }
    catch (error) {
      console.log(error)
    }
  })


  /*router.get('/users', paginatedResults(users), async (req, res) => {
    try {
      // const getData = await users.find({})
      // res.send(getData)
      res.json({sucess:true,data:res.paginatedResults})
    } catch (err) {
      res.json({success:false,error:err})
    }
  })*/

  router.get('/users', async (req, res) => {
    try {
       /*await users.find({},(err,result)=>{
        if(err) console.log(err)
        res.json({data:result})
       })*/
       const getData = await users.find({})
       res.json({data:getData})

    }
      catch (err) {
      console.log(err)
    }
  })





  router.post("/login", (req, res, next) => {
    var email = req.body.email
    var password = req.body.password
    users.findOne({ email: req.body.email })
      .then(user => {
        if (user) {
          const mail = user.email;
          const id = user._id;
          bcrypt.compare(password, user.password, function (err, result) {
            if (err) {
              res.json({
                success:false,
                error: err
              })
            }
            if (result) {
              // let token=jwt.sign({email:user.email,_id:user._id},process.env.ACCESS_TOKEN_SECRET)
              let token = jwt.sign({ mail, id }, process.env.ACCESS_TOKEN_SECRET)
              res.json({
                success:true,
                message: 'loginsuccess',
                token: token
              })
            }
            else {
              res.json({
                message: 'Password does not matched!',
              })
            }
          })
        }
        else {
          res.json({
            message: 'no user found. please signup to open account'
          })
        }
      })


  });


}