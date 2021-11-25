const mongoose = require("mongoose");

const subitems = new mongoose.Schema({
  categoryId:{type:mongoose.Types.ObjectId,ref:'category'}, //give "title":**** in postman instead of categoryId.
  userId:{type:mongoose.Types.ObjectId,ref:'user'},
  productName: { type: String, required: true},
  cost:{type:String, required:true}
});

module.exports = new mongoose.model("subItems", subitems);
