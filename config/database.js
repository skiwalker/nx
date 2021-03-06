'use strict';

var mongoose = require('mongoose');
var uri = 'mongodb://localhost/herois';

mongoose.Promise = global.Promise;
var connection = mongoose.connect(uri);
var db = connection.createConnection(uri);

db.on('error', function(err) {
  console.log(err);
});

module.exports = db;