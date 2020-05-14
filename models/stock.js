let mongoose = require('mongoose');
let path = require('path');
let Schema = mongoose.Schema;
let ObjectId = Schema.ObjectId;


let StockSchema = new Schema({
    category_id: {type:ObjectId},
    name: { type: String, required: true},
    filename: {type:String}, 
    description: { type: String },
    wpminprice: {type: String, min: 0},
    wpmaxprice: {type: String, min: 0},
    rpminprice: {type: String, min: 0},
    rpmaxprice: {type: String, min: 0},

})

StockSchema.virtual('uniqueId').get(function(){
    return this.filename.replace(path.extname(this.filename), '')
});

module.exports = mongoose.model('stock', StockSchema);