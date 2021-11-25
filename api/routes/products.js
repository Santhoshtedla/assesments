const mongoose=require('mongoose')
var subItems = require('../../schemas/product')
var category = require('../../schemas/category')
var users = require('../../schemas/user');
const jwt_decode = require('jwt-decode');

const authenticateToken = require('./auth');

module.exports=function(router) {

    router.use(function (req, res, next) {
        res.loginid = (req, resp) => {
            const authHeader = req
            const token = authHeader && authHeader.split(' ')[1]
            const decode = jwt_decode(token)
            return decode.id;
        }
        next();
    })

    router.post('/addItem',authenticateToken, async function (req, res) {
        try{
        let newItem = new subItems(req.body);
        const existingitem = await subItems.findOne({productName: req.body.productName});
        if(existingitem){
            return res.json({message:"item already exists."});
        }

        let categoryData = await category.findOne({ title: req.body.title })
        let userData=await users.findOne({email:req.body.email})
        newItem.userId=userData._id;
        newItem.categoryId = categoryData._id;
        const cat=categoryData.title;
        const mail=userData.email;
        newItem.save(function (err, newItem) {
            if (err) {

                res.send(err)
            }
           // res.send(newItem);
           res.json({product:newItem.productName,
                     cost:newItem.cost,
                     message:"succesfully added"})
                    })
    }catch(err)
    {
        console.log(err)
    }
    })



    router.get('/items',authenticateToken, async (req,res)=>{
        try{
           const userid = res.loginid(req.headers['authorization']);
           const subitemsFound = await subItems.find({ userId: userid });
           res.json({success:true,data:subitemsFound})     
        }
        catch(err)
        {
            console.log(err)
        }
    })

    router.delete('/deleteItem/:id',authenticateToken, async (req,res)=>{
        try {
            const record = req.params.id;
            let deleteitem=await subItems.findOne({_id:record})
            if(!deleteitem)
            {
                res.send('id not found in our database')
            }
            await subItems.deleteOne( { _id:record } )
            res.send('product deleted from your list')
        }
        catch(err){
            res.send(err)
        }
    })

}