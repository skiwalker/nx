var mongoose = require('mongoose');
var db = require('../config/database');
var PowerModel = {};

PowerModel.create = function(query, callback) {
	
	db.collection('SuperPower').insert(query, function(err, data) {
		if(err) {
			callback(err, null);
		} else {
			callback(null, data.ops[0]);
		}
		mongoose.connection.close();
	});
};

PowerModel.validate = function(query, callback) {
	db.collection('SuperPower').findOne(query, function(err, data) {
	  if(err){
			callback(err);
	  } else {
			callback(null, data);
		}
		mongoose.connection.close();
  });
}

PowerModel.update = function(query, callback) {
	db.collection('SuperPower').updateOne(
	{ "_id": query._id },
	{ $set: query.body },
	function(err, results) {
		if(err){
			callback(err);
		} else {
			callback(null, results);
		}
		mongoose.connection.close();
	});
}

PowerModel.list = function(query, callback) {
	db.collection('SuperPower').find(query).sort({name:1}).toArray(function(err, data) {
		if(err){
			callback(err);
		} else {
			callback(null, data);
		}
		mongoose.connection.close();
	});
}

PowerModel.getId = function(query, callback) {
	db.collection('SuperPower').findOne(query, function(err, data) {
	  if(err){
			callback(err);
	  } else {
			callback(null, data);
		}
		mongoose.connection.close();
  });
}

PowerModel.delete = function(query, callback) {
	console.log(query);
	db.collection('SuperPower').deleteOne(query, function(err, data) {
	  if(err){
			callback(err);
	  } else {
			callback(null, data);
		}
		mongoose.connection.close();
  });
}

module.exports = PowerModel;