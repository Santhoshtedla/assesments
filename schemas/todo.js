const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  }
});

module.exports = new mongoose.model("Todo", todoSchema);
