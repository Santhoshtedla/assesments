var category = require('../../schemas/category')
var subItems = require('../../schemas/product')
var users = require('../../schemas/user');

const jwt_decode = require('jwt-decode');
const authenticateToken = require('./auth');

module.exports = function (router) {
    router.get('/todoList', authenticateToken, async (req, res) => {
        try {
            router.use(function (req, res, next) {
                res.loginid = (req, resp) => {
                    const authHeader = req
                    const token = authHeader && authHeader.split(' ')[1]
                    const decode = jwt_decode(token)
                    return decode.id;
                }
                next();
            })

            const userid = res.loginid(req.headers['authorization']);
            const categoriesFound = await category.find({ userId: userid }).select({ "title": 1, "_id": 0 });
            const subitemsFound = await subItems.find({ userId: userid }).select({ "productName": 1, "cost": 1, "_id": 0 });
            res.json({
                success: true,
                categories: categoriesFound,
                sub_Items: subitemsFound
            })
        }
        catch (error) {
            res.json({ sucess: false, error: error })
        }
    })
}
