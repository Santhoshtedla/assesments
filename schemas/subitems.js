const mongoose = require("mongoose");
const { Schema } = require('mongoose');

const subitems = new mongoose.Schema({
  productId:{type:Schema.Types.ObjectId,ref:'category'},
  productName: { type: String, required: true},
  cost:{type:String, required:true}
});

module.exports = new mongoose.model("subItems", subitems);
