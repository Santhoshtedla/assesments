var category = require('../../schemas/category')
var subItems = require('../../schemas/product')
var users = require('../../schemas/user');
const jwt = require('jsonwebtoken')
const jwt_decode = require('jwt-decode');

const authenticateToken = require('./auth');

module.exports = function (router) {

    router.use(function (req, res, next) {
        res.loginid = (req, resp) => {
            const authHeader = req
            const token = authHeader && authHeader.split(' ')[1]
            const decode = jwt_decode(token)
            return decode.id;
        }
        next();
    })


    router.post('/addCategory', authenticateToken, async (req, res) => {
        try {

            let newCategory = new category(req.body);
            const existingCategory = await category.findOne({ title: req.body.title });
            let userData = await users.findOne({ email: req.body.email })
            newCategory.userId = userData._id;
            let mail = userData.email;
            newCategory.save(function (err, newCategory) {
                if (err) {

                    res.json({ error: err })
                }
            });

            res.json({
                success: true,
                category: newCategory.title,
                message: "successfully added"
            });

        }
        catch (error) {
            console.log(error);
        }
    })

    router.get('/categories', authenticateToken, async (req, res) => {
        try {
            const userid = res.loginid(req.headers['authorization']);
            const categoriesFound = await category.find({ userId: userid });
            res.json({ categories_added: categoriesFound })
        }
        catch (err) {
            console.log(err)
        }
    })

    router.delete('/deleteCategory/:id', authenticateToken, async (req, res) => {
        try {
            const record = req.params.id;
            let deleteCategory=await category.findOne({_id:record})
            if(!deleteCategory)
            {
                res.send('id not found in our database')
            }
            await category.deleteOne( { _id:record } )
            res.send('category deleted')
        }
        catch (err) {
            res.send(err)
        }
    })
}