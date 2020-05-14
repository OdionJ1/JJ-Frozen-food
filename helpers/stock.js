let StockModel = require('../models/stock')
let async = require('async');

module.exports = {
    newest: function(callback){
        StockModel.find({}, {}, {limits:5, sort: {timestamp: -1}},
            function(err, stocks){
                if(err){throw err}


                async.each(stocks, function(err){
                    if(err){throw err}

                    callback(null, stocks)
                })

            });
    }
}