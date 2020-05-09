let StockModel = require('../models/stock');
let StockCategoriesModel = require('../models/stockcategories');

module.exports = {
    index: function(req, res){
        let viewModel = {
            layout: 'stockpagemain',
            category: []
        };

        StockCategoriesModel.find({}, function(err, result){
            if (err) throw err;
            console.log(result);
            viewModel.category = result;

            res.render('stockpage', viewModel)
        }).lean();
    },

    createCategory: async function(req, res){
        const { categoryname } = req.body;

        let newCategoryModel = new StockCategoriesModel({ categoryname });

        newCategoryModel.save(function(err, category){
            if (err) throw err;

            console.log(category.categoryname);
            res.redirect(`/#${category._id}`)
        })
    }


}