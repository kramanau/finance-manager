const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  userId: { type: String, index: true }
});

module.exports = mongoose.model("category", categorySchema);