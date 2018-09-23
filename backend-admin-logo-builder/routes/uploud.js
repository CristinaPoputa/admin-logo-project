var express = require('express');
var router = express.Router();
var mongo = require('../library/connection');
var formidable = require('formidable');
var fs = require('fs');
var moment = require('moment');
var path = require('path');

var dropbox = require('../library/dropboxUpload');

var name;
var logoArray = []
function createDir(dir){
	if (!fs.existsSync(dir)){
		fs.mkdirSync(dir);
	}
}

router.post('/',function(req,res,next){
    var form = new formidable.IncomingForm({multiples:true});
	var logoArray = []
    form.parse(req, function(err, fields, files) {
    	var key= Object.keys(files)[0];
    	var rootDir = path.join(__dirname,'/../public/uploads/');
    	var fileDir = rootDir+key+'/';
    	createDir(fileDir);
    	var files = files[key];
    	if (Array.isArray(files)){
	    	files.forEach((file,index)=>{
	    		var ext = file.name.split('.')[file.name.split('.').length-1];
	    		var name = index+"-"+key+"-"+Date.now().toString()+'.'+ext //key + "-"+Date.now()+'.'+file.name.split('.')[file.name.split('.').length-1];
	    		var fileName = file.path;
	    		fs.rename(fileName, fileDir+name, function (err) {
				    if (err) throw err;
				    // dropbox.uploadDropbox(fileDir+name);
				    var time = moment().format().split('+')[0];
				    var insertObj = {
	    				type: key,
		    			photo:{
		    				name: name,
		    				size: file.size,
		    				timestamp: time,
		    				extension: ext
		    			}
	    			}
	    			logoArray.push(insertObj);
	    			if (files.length==logoArray.length)
					  	res.send({message:"Upload done succesfully", data:logoArray});
	    			mongo.connection.then(client=>{
	    				const dbName = "admin-logo-builder";
					  	const db = client.db(dbName);
					  	const collection = db.collection('logos');
					  	collection.insertOne(insertObj,function(err,result){
					  		if(err) console.log(err);
					  	})
	    			})
				});
	    	})
	    }
	    else{
	    	var ext = files.name.split('.')[files.name.split('.').length-1];
	    	name = key+"-"+Date.now()+'.'+ext;
	    	fs.rename(files.path, fileDir+name, function (err) {
				if (err) throw err;
				// dropbox.uploadDropbox(fileDir+name);
				var time = moment().format().split('+')[0];
				    var insertObj = {
	    				type: key,
		    			photo:{
		    				name: name,
		    				size: files.size,
		    				timestamp: time,
		    				extension: ext
		    			}
	    			}
	    			mongo.connection.then(client=>{
	    				const dbName = "admin-logo-builder";
					  	const db = client.db(dbName);
					  	const collection = db.collection('logos');
					  	collection.insertOne(insertObj,function(err,result){
					  		if(err) console.log(err);
					  		res.send({message:"Upload done succesfully", data:[insertObj]});
					  	})
	    			})
			});
	    }
    })
});

module.exports = router;
