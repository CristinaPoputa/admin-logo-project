function ondragoverFnc(event){
	
	event.preventDefault();
	event.stopPropagation();
	if(event.target.id == "premade" || event.target.id == "icons" || event.target.id == "frames")
	{
	event.target.className =  "dropzone dragover";
	}
}

function ondragleaveFnc(event){
	
	event.preventDefault();
	event.stopPropagation();

	if(event.target.id == "premade" || event.target.id == "icons" || event.target.id == "frames")
	{
	event.target.className = "dropzone";
	}
}

function ondropFnc(event){
	
	event.preventDefault();
	event.stopPropagation();
	

	if(event.target.id == "premade" || event.target.id == "icons" || event.target.id == "frames")
	{
	event.target.className = "dropzone";
	}

	upload(event.dataTransfer.files,event.target.id);
}

function handlerFiles(element)
{
	var ids = element.target.id.split("_");
	var files = element.target.files;
	console.log(files,ids[0]);
	upload(files,ids[0]);
}

function upload(files,id){
	
	var xhr = new XMLHttpRequest();
	var formData = new FormData();
	var i;
	
	for(i=0;i<files.length;i++)
	{
		formData.append(id,files[i]);
	}
	
	xhr.open('POST','http://localhost:3000/upload');
	xhr.send(formData);
	
}

