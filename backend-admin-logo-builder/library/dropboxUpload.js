var token = require('./dropbox_key').token;
var request = require('request');
var fs = require('fs');
var path = require('path');


function uploadDropbox(path){
	console.log(token);
    var filename = path.split('/')[path.split('/').length-1];
	var content = fs.readFileSync(path);
	options = {
            method: "POST",
            url: 'https://content.dropboxapi.com/2/files/upload',
            headers: {
              "Content-Type": "application/octet-stream",
              "Authorization": "Bearer " + token,
              "Dropbox-API-Arg": "{\"path\": \"/logobuilder/"+filename+"\",\"mode\": \"overwrite\",\"autorename\": true,\"mute\": false}",
            },
            body:content
	};

	request(options,function(err, res,body){
 	})
}


module.exports = {
	uploadDropbox:uploadDropbox
}