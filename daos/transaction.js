const Transactions = require('../models/category');

module.exports = {};

module.exports.createTransaction = async (transactionObject) => {
    return await Transactions.create({ ...transactionObject });
}

module.exports.getTransactionById = async (_id) => {
    return await Transactions.findOne({ _id });
}