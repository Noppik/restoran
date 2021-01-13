#! /usr/bin/env node

console.log('This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')
var Stol = require('./models/stol')


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var stols = []


function stolCreate(number, booked, dataBooked, cb) {
  stoldetail = { 
    number: number,
    booked: booked,
    dataBooked: dataBooked
  }    
    
  var stol = new Stol(stoldetail);    
  stol.save(function (err) {
    if (err) {
      console.log('ERROR CREATING BookInstance: ' + stol);
      cb(err, null)
      return
    }
    console.log('New Stol: ' + stol);
    stols.push(stol)
    cb(null, stol)
  }  );
}



function createStols(cb) {
    async.parallel([
        function(callback) {
            stolCreate(1, false, Date.now(), callback)
        },
        function(callback) {
            stolCreate(2, false, Date.now(), callback)
        },
        function(callback) {
            stolCreate(3, false, Date.now(), callback)
        },
        function(callback) {
            stolCreate(4, false, Date.now(), callback)
        },
        function(callback) {
            stolCreate(5, false, Date.now(), callback)
        },
        function(callback) {
            stolCreate(6, false, Date.now(), callback)
        },
        function(callback) {
            stolCreate(7, false, Date.now(), callback)
        },
        function(callback) {
            stolCreate(8, false, Date.now(), callback)
        },
        function(callback) {
            stolCreate(9, false, Date.now(), callback)
        },
        function(callback) {
            stolCreate(10, false, Date.now(), callback)
        },
        function(callback) {
            stolCreate(11, false, Date.now(), callback)
        }
        ],
        // Optional callback
        cb);
}



async.series([
    createStols
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('Stols: '+stols);
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});



