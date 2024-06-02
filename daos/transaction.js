const Transactions = require('../models/transaction');
const mongoose = require('mongoose');

module.exports = {};

module.exports.createTransaction = async (transactionObject) => {
    return await Transactions.create({ ...transactionObject });
}

module.exports.getTransactionById = async (_id) => {
    return await Transactions.findOne({ _id });
}

module.exports.updateTransactionById = async (_id, transactionObject) => {
    return await Transactions.updateOne({_id}, {...transactionObject});
}

module.exports.deleteTransactionById = async (_id) => {
    return await Transactions.deleteOne({_id});
}

module.exports.getTotalsByCategoryId = async (_id) => {
    return await Transactions.aggregate(
        [
            { $match: { categoryId: new mongoose.Types.ObjectId(_id)}},
            { $group: { _id: "$categoryId", total: { "$sum" : "$amount"}}}
        ]
    )
}

module.exports.getTransactionsByCategoryId = async (_id) => {
    return await Transactions.find({ categoryId: _id });
}

module.exports.getAllTransactions = async (userId) => {
    return await Transactions.find({ userId });
}