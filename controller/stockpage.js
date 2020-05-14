let path = require('path');
let fs = require('fs');
let StockModel = require('../models/stock');
let StockCategoriesModel = require('../models/stockcategories');

module.exports = {
    index: function(req, res){
        let viewModel = {
            layout: 'stockpagemain',
            category: [],
            stock: [],
        };

        StockCategoriesModel.find({}, function(err, result){
            if (err) throw err;
            console.log(result);
            viewModel.category = result;

        }).lean();

        StockModel.find({}, function(err, result){
            if (err) throw err;

            viewModel.stock = result;

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
    },

    postStock: function(req, res){
        function saveImage(){
            let possible = 'abcdefghijklmnopqrstuvwxyz0123456789';
            let imgUrl = '';

            for(i=0; i<6; i+=1){
                imgUrl += possible.charAt(Math.floor(Math.random() *possible.length));
            }

            StockModel.find({'filename':{$regex:imgUrl}}, function(err, stock){
                if(err) throw err;

                if(stock.length > 0){
                    saveImage();
                } else {
                    let tempPath = req.file.path;
                    let ext = path.extname(req.file.originalname).toLowerCase();
                    let targePath = path.resolve('./public/upload/' + imgUrl + ext);

                    if(ext === '.jpg' || ext === '.jpeg' || ext === '.png' || ext === '.gif'){
                        fs.rename(tempPath, targePath, function(err){
                            if(err) {
                                throw err;
                            }
    
                    let newStock = new StockModel({
                        name:req.body.name,
                        filename: imgUrl + ext,
                        description:req.body.description, 
                        wpmin: req.body.wpminprice,
                        wpmax: req.body.wpmaxprice,
                        rpmin: req.body.rpminprice,
                        rpmax: req.body.rpmaxprice,
                        category_id:req.category._id
                    });
    
                    newStock.save(function(){
                        if(err){
                            throw err
                        }
    
                        res.redirect('/stockpage')
                    });
    
                    
                    });   
                    } else {
                        fs.unlink(tempPath, function(err) {
                            if(err){
                                throw err;
                            }
    
                    res.status(500).json({'Error': 'Invalid File Format'});
                    });
                    }
                }

            })
        }
        saveImage();
    }


}