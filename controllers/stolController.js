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

    Stol.find({}, 'number booked yesterday today tomorrow')
      .populate('stol')
      .exec(function (err, list_stols) {
        if (err) { return next(err); }
        //Successful, so render
        res.render('stol_list', { title: 'Бахтиярро: столы', stol_list: list_stols });
      });
  
};

exports.stol_detail = function(req, res) {
    //res.send('NOT IMPLEMENTED: Book detail: ' + req.params.id);
    Stol.find({_id: req.params.id}, 'number booked yesterday today tomorrow')
      .populate('stol')
      .exec(function (err, list_stols) {
        if (err) { return next(err); }
        //Successful, so render
        res.render('stol_detail', { title: 'Бахтиярро: стол ' + list_stols[0].number, stol: list_stols[0], data: req.params.data, time: req.params.time });
      });
};

exports.stol_detail_booked = function(req, res) {
    //res.send('NOT IMPLEMENTED: Book detail: ' + req.params.id);
    if(req.params.data == 1) {
      if (req.params.time == 1) {
        Stol.findByIdAndUpdate(req.params.id, { yesterday: [ true, false, false] }, function (err, stol) {
            if (err) { return next(err); }
            //Successful, so render
            let nameV = 'you'
            if (/^[a-zA-Zа-яА-Я0-9]*$/.test(req.params.name))
              nameV = req.params.name
            res.render('stol_detail_booked', { title: 'Бахтиярро: бронь', stol: stol, name: nameV, data: req.params.data, time: req.params.time });
          });
      }
      if (req.params.time == 2) {
        Stol.findByIdAndUpdate(req.params.id, { yesterday: [false, true, false] }, function (err, stol) {
            if (err) { return next(err); }
            //Successful, so render
            let nameV = 'you'
            if (/^[a-zA-Zа-яА-Я0-9]*$/.test(req.params.name))
              nameV = req.params.name
            res.render('stol_detail_booked', { title: 'Бахтиярро: бронь', stol: stol, name: nameV, data: req.params.data, time: req.params.time });
          });
      }
      if (req.params.time == 3) {
        Stol.findByIdAndUpdate(req.params.id, { yesterday: [false, false, true] }, function (err, stol) {
            if (err) { return next(err); }
            //Successful, so render
            let nameV = 'you'
            if (/^[a-zA-Zа-яА-Я0-9]*$/.test(req.params.name))
              nameV = req.params.name
            res.render('stol_detail_booked', { title: 'Бахтиярро: бронь', stol: stol, name: nameV, data: req.params.data, time: req.params.time });
          });
      }
    }
    if(req.params.data == 2) {
      if (req.params.time == 1) {
        Stol.findByIdAndUpdate(req.params.id, { today: [ true, false, false] }, function (err, stol) {
            if (err) { return next(err); }
            //Successful, so render
            let nameV = 'you'
            if (/^[a-zA-Zа-яА-Я0-9]*$/.test(req.params.name))
              nameV = req.params.name
            res.render('stol_detail_booked', { title: 'Бахтиярро: бронь', stol: stol, name: nameV, data: req.params.data, time: req.params.time });
          });
      }
      if (req.params.time == 2) {
        Stol.findByIdAndUpdate(req.params.id, { today: [false, true, false] }, function (err, stol) {
            if (err) { return next(err); }
            //Successful, so render
            let nameV = 'you'
            if (/^[a-zA-Zа-яА-Я0-9]*$/.test(req.params.name))
              nameV = req.params.name
            res.render('stol_detail_booked', { title: 'Бахтиярро: бронь', stol: stol, name: nameV, data: req.params.data, time: req.params.time });
          });
      }
      if (req.params.time == 3) {
        Stol.findByIdAndUpdate(req.params.id, { tofay: [false, false, true] }, function (err, stol) {
            if (err) { return next(err); }
            //Successful, so render
            let nameV = 'you'
            if (/^[a-zA-Zа-яА-Я0-9]*$/.test(req.params.name))
              nameV = req.params.name
            res.render('stol_detail_booked', { title: 'Бахтиярро: бронь', stol: stol, name: nameV, data: req.params.data, time: req.params.time });
          });
      }
    }
    if(req.params.data == 3) {
      if (req.params.time == 1) {
        Stol.findByIdAndUpdate(req.params.id, { tomorrow: [ true, false, false] }, function (err, stol) {
            if (err) { return next(err); }
            //Successful, so render
            let nameV = 'you'
            if (/^[a-zA-Zа-яА-Я0-9]*$/.test(req.params.name))
              nameV = req.params.name
            res.render('stol_detail_booked', { title: 'Бахтиярро: бронь', stol: stol, name: nameV, data: req.params.data, time: req.params.time });
          });
      }
      if (req.params.time == 2) {
        Stol.findByIdAndUpdate(req.params.id, { tomorrow: [false, true, false] }, function (err, stol) {
            if (err) { return next(err); }
            //Successful, so render
            let nameV = 'you'
            if (/^[a-zA-Zа-яА-Я0-9]*$/.test(req.params.name))
              nameV = req.params.name
            res.render('stol_detail_booked', { title: 'Бахтиярро: бронь', stol: stol, name: nameV, data: req.params.data, time: req.params.time });
          });
      }
      if (req.params.time == 3) {
        Stol.findByIdAndUpdate(req.params.id, { tomorrow: [false, false, true] }, function (err, stol) {
            if (err) { return next(err); }
            //Successful, so render
            let nameV = 'you'
            if (/^[a-zA-Zа-яА-Я0-9]*$/.test(req.params.name))
              nameV = req.params.name
            res.render('stol_detail_booked', { title: 'Бахтиярро: бронь', stol: stol, name: nameV, data: req.params.data, time: req.params.time });
          });
      }
    }
};