const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    email: String
});

module.exports = mongoose.model('User', userSchema);