const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://cristina:cristina1@ds243502.mlab.com:43502/admin-logo-builder';


	var connection = MongoClient.connect(url, {useNewUrlParser: true})
		.then(function(db){
			return db;
		})
		.catch(function(err){
			return err;
		})

module.exports = {
		connection
}