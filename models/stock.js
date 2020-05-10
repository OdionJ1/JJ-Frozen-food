let mongoose = require('mongoose');
let path = require('path');
let Schema = mongoose.Schema;
let ObjectId = Schema.ObjectId;


let StockSchema = new Schema({
    category_id: {type:ObjectId},
    name: { type: String, required: true},
    filename: {type:String},
    description: { type: String },
    price: {
        min: {type: Number, min: 0},
        max: {type: Number, min: 0}
    }

})

StockSchema.virtual('uniqueId').get(function(){
    return this.filename.replace(path.extname(this.filename), '')
});

module.exports = mongoose.model('stock', StockSchema);