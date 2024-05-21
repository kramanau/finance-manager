const Users = require('../models/user');

module.exports = {};

module.exports.createUser = async (email, password) => {
    return await Users.create({ email, password, roles : ['user'] });
}

module.exports.getUser = async (email) => {
    return await Users.findOne({ email });
}

module.exports.changePassword = async (_id, password) => {
    return await Users.updateOne({ _id }, { password });
}