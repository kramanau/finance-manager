const Categories = require('../models/category');

module.exports = {};

module.exports.getCategoryById = async (_id, userId) => {
    return await Categories.findOne({ _id, userId });
}

module.exports.getCategoryByName = async (name, userId) => {
    return await Categories.findOne({ name, userId });
}

module.exports.getCategoriesByUser = async (userId) => {
    return await Categories.find({ userId });
}

module.exports.createCategory = async ({ name, description = null, userId }) => {
    return await Categories.create({ name, description, userId });
}

module.exports.updateCategory = async (_id, categoryItem, userId) => {
    return await Categories.updateOne({ _id, userId }, { ...categoryItem });
}
