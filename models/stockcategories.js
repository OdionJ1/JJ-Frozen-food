let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let CategorySchema = new Schema({
    categoryname: { type: String, required: true }
})

module.exports = mongoose.model('category', CategorySchema);