var Stol = require('../models/stol');

// Display list of all BookInstances.

var async = require('async');

exports.index = function(req, res) {

    async.parallel({
        stol_count: function(callback) {
            Stol.countDocuments({}, callback);
        },
        stol_available_count: function(callback) {
            Stol.countDocuments({booked: false}, callback);
        }
    }, function(err, results) {
        res.render('index', { title: 'Ресторан Бахтиярро', error: err, data: results });
    });
};

exports.stol_list = function(req, res, next) {

    Stol.find({}, 'number booked')
      .populate('stol')
      .exec(function (err, list_stols) {
        if (err) { return next(err); }
        //Successful, so render
        res.render('stol_list', { title: 'Бахтиярро: столы', stol_list: list_stols });
      });
  
};

exports.stol_detail = function(req, res) {
    //res.send('NOT IMPLEMENTED: Book detail: ' + req.params.id);
    Stol.find({_id: req.params.id}, 'number booked dataBooked')
      .populate('stol')
      .exec(function (err, list_stols) {
        if (err) { return next(err); }
        //Successful, so render
        res.render('stol_detail', { title: 'Бахтиярро: стол ' + list_stols[0].number, stol: list_stols[0] });
      });
};

exports.stol_detail_booked = function(req, res) {
    //res.send('NOT IMPLEMENTED: Book detail: ' + req.params.id);
    Stol.findByIdAndUpdate(req.params.id, {booked: true, dataBooked: Date.now()}, function (err, stol) {
        if (err) { return next(err); }
        //Successful, so render
        stol.booked = true
        stol.dataBooked = Date.now()
        res.render('stol_detail_booked', { title: 'Бахтиярро: бронь', stol: stol, name: req.params.name });
      });
};