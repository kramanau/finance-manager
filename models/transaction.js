const mongoose = require("mongoose");

// const TransactionType = {
//     income: "income",
//     expense: "expense"
// };

const transactionSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  amount: { type: Number, required: true },
//   type: { type: String, enum: Object.values(TransactionType), required: true },
  userId: { type: String, index: true, required: true },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'category' }
});

module.exports = mongoose.model("transaction", transactionSchema);