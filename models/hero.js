var db = require('../config/database');
var HeroModel = {};


HeroModel.create = function(query, callback) {
	
	db.collection('superHero').insert(query, function(err, data) {
		if(err) {
			callback(err, null);
		}
		callback(null, data.ops[0]);
	});
};

HeroModel.validate = function(query, callback) {
	db.collection('superHero').findOne(query, function(err, data) {
	  if(err){
			callback(err);
	  }
	  callback(null, data);
  });
}

HeroModel.update = function(query, callback) {
	db.collection('superHero').updateOne(
	{ "_id": query._id },
	{ $set: query.body },
	function(err, results) {
		if(err){
			callback(err);
		}
		callback(null, results);
	});
}

HeroModel.list = function(query, callback) {
	db.collection('superHero').find(query).sort({name:1}).toArray(function(err, data) {
		if(err){
			callback(err);
		}
		callback(null, data);
	});
}

HeroModel.getId = function(query, callback) {
	console.log('aqio...');
	db.collection('superHero').findOne(query, function(err, data) {
	  if(err){
			callback(err);
	  }
	  callback(null, data);
  });
}

HeroModel.delete = function(query, callback) {
	console.log(query);
	db.collection('superHero').deleteOne(query, function(err, data) {
	  if(err){
			callback(err);
	  }
	  callback(null, data);
  });
}

module.exports = HeroModel;