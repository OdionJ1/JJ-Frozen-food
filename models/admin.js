let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let bcrypt = require('bcryptjs');
let saltRound = 10;

let AdminSchema = new Schema ({
    adminID: {type:String},
    password: {type:String}
});

AdminSchema.methods.encryptPassword = function(password){
    let salt = bcrypt.genSaltSync(saltRound);
    let hash = bcrypt.hashSync(password, salt);

    return hash;
}

AdminSchema.methods.checkPassword = function(guessPassword){
    return bcrypt.compareSync(guessPassword, this.password);
}

module.exports = mongoose.model('admin', AdminSchema);