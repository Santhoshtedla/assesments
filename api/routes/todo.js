const mongoose=require('mongoose')
var category = require('../../schemas/item')
var subItems = require('../../schemas/subitems')
const router = require('./registration')

module.exports=function(rounter) {
    router.post('/addCategory', async (req,res)=>{
        try{
            const newCategory=req.body;
            const existingCategory = await category.findOne({title: req.body.title});
            if(existingCategory){
                return res.send("category already exists.");
            }
            await category.create(newCategory)
            res.send('category succesfully added');

        }
        catch(error)
        {
            console.log(error);
        }
    })

    router.get('/categories', async (req,res)=>{
        try{
        const getList=await category.find({})
        res.send(getList)
        }
        catch(err)
        {
            console.log(err)
        }
    })

    router.delete('/deleteCategory/:title', async (req,res)=>{
        try {
            const record = req.params.title;
            if(req.body.title==record){
            const delRecord = await category.deleteOne(
                {"title" : `${record}`}
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