let passport = require('passport');
let StockCategoriesModel = require('../models/stockcategories');

module.exports = function(){
    passport.serializeUser(function(category, done){
        done(null, category.id);
    });

    passport.deserializeUser(function(id, done){
        StockCategoriesModel.findById(id, function(err, category){
            if(err) throw err;

            done(null, category);
        })   
    });
}