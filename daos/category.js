const Categories = require('../models/category');

module.exports = {};

module.exports.getCategoryById = async (_id) => {
    return await Categories.findOne({ _id });
}

module.exports.getCategoryByName = async (name) => {
    return await Categories.findOne({ name });
}

module.exports.createCategory = async (name, description) => {
    return await Categories.create({ name, description });
}

module.exports.updateCategory = async (_id, name, description) => {
    return await Categories.updateOne({ _id }, { name, description });
}
