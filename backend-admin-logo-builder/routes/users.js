var express = require('express');
var router = express.Router();
var md5 = require('md5');
var mongo = require('../library/connection');

/* GET users listing. */
router.post('/login', function(req, res, next) {
  let username = req.body.username;
  let password = md5(req.body.password)

  mongo.connection.then(client=>{
  	const dbName = "admin-logo-builder";
  	const db = client.db(dbName);
  	const collection = db.collection('user');
  	collection.find({"username":username,"password":password}).toArray((err,user)=>{
  		console.log(user);
  		if (err)
  			res.send({"message":"Error query","err":err})
  		if (user.length == 0)
  			res.send({"message":"User not found"})
  		else{
  			const data = {
  				_id: user[0]._id,
  				id: user[0].id,
  				username: user[0].username,
  			}
  			res.send({"message":"User found","user":data})
  		}
  		})
  	})
  		.catch(err=>{
  			res.send({"message":"Error db connection","err":err})
  		})
  
});

module.exports = router;
