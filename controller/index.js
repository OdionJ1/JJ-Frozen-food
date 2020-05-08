let jsdom = require("jsdom");
let { JSDOM } = jsdom;
let ReviewModel = require('../models/review');

module.exports = {
    home: function (req, res) {
        let viewModel = {
            layout: 'main',
            review: []
        };

        ReviewModel.find({}, function (err, result) {
            if (err) throw err;
            // console.log(result.rating);
            // console.log(typeof`${result.rating}`)

            if (result) {
                viewModel.review = result;
                viewModel.review.forEach(element => {
                    if(element.rating === 2){
                        viewModel.rate2 = 2
                    }
                    console.log(typeof element.rating);
                    console.log(viewModel.rate2)
                });

                res.render('index', viewModel);
            } else {
                res.redirect('/');
            }
        }).lean();
    },


    review: async function (req, res) {
        const { rating, testimonial, name } = req.body;

        let newReviewModel = new ReviewModel({ rating, testimonial, name });
        

        newReviewModel.save(function (err, review) {
            if (err) throw err;

            console.log(review);
            console.log(review.rating);
            res.redirect(`/#${review._id}`);

        });
        
    }
}