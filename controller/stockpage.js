let async = require('async')
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

        StockModel.find({'category_id': req.params.Categoryname}, function(err, result){
            if (err) throw err;
            // console.log('params = ',req.params.Categoryname)

            viewModel.stock = result;
            viewModel.categoryname = req.params.Categoryname

            res.render('stockpage', viewModel)
        }).lean();
    },

    getProduct: function(req, res){
        let viewModel = {};

        StockModel.find({}, function(err, stock){
            if (err) throw err;

            if (stock){

                //I'm giving a condition for a possible search word here
                if (req.body.product.toLowerCase() == "egg"){
                    req.body.product = 'eggs'
                }

                if (req.body.product.toLowerCase()  == "sausages"){
                    req.body.product = 'sausage'
                }

                if (req.body.product.toLowerCase()  == "croaker fish"){
                    req.body.product = 'Croaker Fish(20kg)'
                }

                if (req.body.product.toLowerCase()  == "panla fish"){
                    req.body.product = 'Panla Fish(10kg)'
                }

                if (req.body.product.toLowerCase()  == "kote fish"){
                    req.body.product = 'Kote Fish(20kg)'
                }

                if (req.body.product.toLowerCase()  == "shawa fish"){
                    req.body.product = 'Shawa Fish(20kg)'
                }
                //

                console.log(req.body.product +' is what you searched for')
    
                let searchResult = stock.filter(function(searched){

                    return searched.name.toLowerCase() == req.body.product.toLowerCase()
                })

                if(searchResult.length == 0){
                    let searchResult = stock.filter(function(searched){

                    return searched.description.toLowerCase() == req.body.product.toLowerCase()
                    })
                    viewModel.product = searchResult
                } else{
                    viewModel.product = searchResult
                }

                if(viewModel.product.length == 0){
                    viewModel.product = "error: productnotfound"

                    req.flash('searchError', 'Product Not Found');
                    res.redirect('/search=' + viewModel.product)

                } else {
                    console.log('You searched for = '+req.body.product)
                    console.log('You searched for = '+viewModel.product[0].name)

                    res.redirect('/search=' + viewModel.product[0].name)
                }

            }
        }).lean()
    },

    searched: function(req, res){
        let viewModel = {
            layout: 'stockpagemain',
            category: [],
            searchError:req.flash('searchError')
        };

        StockModel.find({'description': req.params.product}, function(err, result){
            if (err) throw err;
            console.log('StockByDescription = '+ result)
            console.log(req.params.product)

            viewModel.stockByDescription = result;
        }).lean();

        StockModel.find({'name': req.params.product}, function(err, result){
            if (err) throw err;
            console.log('StockByName = '+ result)
            console.log(req.params.product)

            viewModel.stockByName = result;
 
        }).lean();

        StockCategoriesModel.find({}, function(err, result){
            if (err) throw err;
            viewModel.category = result;
            
            res.render('searchresult', viewModel)
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

                    StockCategoriesModel.findOne({'categoryname':req.params.category}, function(err, category){
                        console.log('params = ', req.params.category);
                        
    
                    let newStock = new StockModel({
                        name:req.body.name,
                        filename: imgUrl + ext,
                        description:req.body.description, 
                        wpminprice: req.body.wpminprice,
                        wpmaxprice: req.body.wpmaxprice,
                        rpminprice: req.body.rpminprice,
                        rpmaxprice: req.body.rpmaxprice,
                        category_id: req.params.category
                    });
    
                    newStock.save(function(){
                        if(err){
                            throw err
                        }
    
                        res.redirect(`/stockpage/${req.params.category}`)
                    });
                    })
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
    },

    removeStock: function(req, res){
        StockModel.findOne({'_id':req.params.stock_id}, function(err, stock){
            if(err) throw err;

            if(stock){
                fs.unlink(path.resolve('./public/upload/' + stock.filename), function(err){
                    if(err) throw err;

                    stock.remove(function(err){
                        if(err){
                            res.json(err);
                        }else{
                            res.json(true)
                        }
                    });
                });
            } else {
                res.redirect('/');
            }
        })
    },

    removeCategory: function(req, res){
        StockCategoriesModel.findOne({'categoryname':req.params.categoryname}, function(err, category){
            console.log(req.params.categoryname)
            if(err) throw err;

            if(category){
                StockModel.find({'category_id':req.params.categoryname}, function(err, stock){
                    if(err) throw err;

                    let deleteStock = function(stock, next){
                        fs.unlink(path.resolve('./public/upload/' + stock.filename), function(err){
                            if(err) throw err;
        
                            stock.remove(function(err){
                                if(err) throw err;
                            });
                            next(err)
                        });
                    }
                    async.each(stock, deleteStock, function(err){
                        if(err) throw err;
                        
                        console.log('Done deleteing all stocks will the category_id '+req.params.categoryname)
                    })
                })
                category.remove(function(err){
                    if(err){
                        res.json(err);
                    }else{
                        res.json(true)
                    }
                });
            } else {
                res.redirect('/')
            }
        })
    }


}