const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  userId:{type:mongoose.Types.ObjectId,ref:'user'},
  title: { type: String, required: true,}

});

module.exports = new mongoose.model("category", todoSchema);
