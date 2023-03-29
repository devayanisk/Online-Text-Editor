const mongoose = require('mongoose');

const docSchema = new mongoose.Schema({
    name: String,
    group: String
});

module.exports = mongoose.model('Document', docSchema);