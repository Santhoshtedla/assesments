const mongoose=require('mongoose')
var subItems = require('../../schemas/subitems')
var category = require('../../schemas/item')
const router = require('./registration')

module.exports=function(rounter) {
    router.post('/addItem', async function (req, res) {
        try{
        let newItem = new subItems(req.body);
        const existingitem = await subItems.findOne({productName: req.body.productName});
        if(existingitem){
            return res.send("item already exists.");
        }

        let categoryData = await category.findOne({ title: req.body.title })
        newItem.productId = categoryData._id;
        newItem.save(function (err, newItem) {
            if (err) {

                res.send(err)
            }
            res.send(newItem);
        })
    }catch(err)
    {
        console.log(err)
    }
    })



    router.get('/items', async (req,res)=>{
        try{
        const getList=await subItems.find({})
        res.send(getList)
        }
        catch(err)
        {
            console.log(err)
        }
    })

    router.delete('/deleteItem/:productName', async (req,res)=>{
        try {
            const record = req.params.productName;
            if(req.body.productName==record){
            const delRecord = await subItems.deleteOne(
                {"productName" : `${record}`}
            )
            res.send('Account deleted')
            }
            else res.send('title not found')
        }
        catch(err){
            res.send(err)
        }
    })

}