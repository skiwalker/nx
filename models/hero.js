var mongoose = require('mongoose');
var db = require('../config/database');
var HeroModel = {};

HeroModel.create = function(query, callback) {
	
	db.collection('superHero').insert(query, function(err, data) {
		if(err) {
			callback(err, null);
		} else {
			callback(null, data.ops[0]);
		}
		mongoose.connection.close();
	});
};

HeroModel.validate = function(query, callback) {
	db.collection('superHero').findOne(query, function(err, data) {
	  if(err){
			callback(err);
	  } else {
			callback(null, data);
		}
		mongoose.connection.close();
  });
}

HeroModel.update = function(query, callback) {
	db.collection('superHero').updateOne(
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

HeroModel.list = function(query, callback) {
	db.collection('superHero').find(query).sort({name:1}).toArray(function(err, data) {
		if(err){
			callback(err);
		} else {
			callback(null, data);
		}
		mongoose.connection.close();
	});
}

HeroModel.getId = function(query, callback) {
	db.collection('superHero').findOne(query, function(err, data) {
	  if(err){
			callback(err);
	  } else {
			callback(null, data);
		}
		mongoose.connection.close();
  });
}

HeroModel.delete = function(query, callback) {
	db.collection('superHero').deleteOne(query, function(err, data) {
	  if(err){
			callback(err);
	  } else {
			callback(null, data);
		}
		mongoose.connection.close();
  });
}

module.exports = HeroModel;