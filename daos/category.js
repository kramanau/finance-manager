const Categories = require('../models/category');

module.exports = {};

module.exports.getCategoryById = async (_id) => {
    return await Categories.findOne({ _id });
}

module.exports.getCategoryByName = async (name) => {
    return await Categories.findOne({ name });
}

module.exports.getCategoriesByUser = async (userId) => {
    return await Categories.find({ userId });
}

module.exports.createCategory = async ({ name, description = null, userId }) => {
    return await Categories.create({ name, description, userId });
}

module.exports.updateCategory = async (_id, categoryItem) => {
    return await Categories.updateOne({ _id }, { ...categoryItem });
}
