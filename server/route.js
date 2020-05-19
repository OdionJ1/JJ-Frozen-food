let index = require('../controller/index');
let stockpage = require('../controller/stockpage');
let router = require('express').Router();


module.exports = function (app) {

    router.get('/', index.home);
    router.get('/stockpage/:category_id', stockpage.index)
    // router.get('/review', index.getReview);
    router.post('/review', index.review);
    router.post('/createcategory' , stockpage.createCategory);
    router.post('/poststock/:_id', stockpage.postStock);

    app.use(router);

}