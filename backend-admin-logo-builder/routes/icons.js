var express = require('express');
var router = express.Router();
var mongo = require('../library/connection');
var path = require('path');


router.get('/',function(req,res,next){
	var premade = [];
	var	icons = [];
	var	frames = [];
	mongo.connection.then(client=>{
	   	const dbName = "admin-logo-builder";
		const db = client.db(dbName);
		const collection = db.collection('logos');
		collection.find({}).toArray(function(err,result){
			if(err) console.log(err);
			result.forEach(pic=>{
				var rootDir = path.join(__dirname,'/../public/uploads/');
    			var fileDir = rootDir+pic.type+'/';
				let link = "file://"+fileDir+pic.photo.name;
				switch(pic.type){
					case 'premade': premade.push({name:pic.photo.name,link:link,size:pic.photo.size,ext:pic.photo.extension,time:pic.photo.timestamp});break;
					case 'icons': icons.push({name:pic.photo.name,link:link,size:pic.photo.size,ext:pic.photo.extension,time:pic.photo.timestamp});break;
					case 'frames': frames.push({name:pic.photo.name,link:link,size:pic.photo.size,ext:pic.photo.extension,time:pic.photo.timestamp});break;
				}
			})
			let data = {"premade":premade,"icons":icons,"frames":frames};
			res.send({'data':data});

		})
	})
})


router.post('/delete',function(req,res,next){
	console.log(req.body);
	var name = req.body.name.trim();
	mongo.connection.then(client=>{
	   	const dbName = "admin-logo-builder";
		const db = client.db(dbName);
		const collection = db.collection('logos');
		collection.deleteOne({"photo.name":name},function(err,result){
			res.send({message:"Succes",data:result});
		})
	})
})



module.exports = router;