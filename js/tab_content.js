
$( document ).ready(function() {
	
  var tabactive, tabcontent;
	
	//hide content for all
	tabcontent = document.getElementsByClassName("tabcontent");
	for(i=0;i < tabcontent.length;i++)
	{
	tabcontent[i].style.display = "none";
	}
	
	tabactive = document.getElementById("gallery_tab");
	tabactive.style.display = "block";
	
	
	getLogos();
});

function getLogos(){

	$.ajax({
		url: 'http://localhost:3000/icons',
		type: 'GET',
		success: function(data){
			
			var innerHTML1 = "";
			var innerHTML2 = "";
			var innerHTML3 = "";

			innerHTML1 += "<div class='row'>";
			data.data.premade.forEach(function(element){

			innerHTML1 += 
			`<div class="col-sm-4 col-md-4"> 
					<div class="container-photo" style="position: relative;">
						<a class="lightbox" href="` + element.link + `" >
							<img src="`+ element.link + `" alt="bridge img">
						</a>
						<button type="button" class="btn btn-light" onclick='deletePhoto("` + element.name + `")'><i class="fas fa-trash-alt" aria-hidden="true"></i></button>
						<input type="checkbox">
					</div>
				</div>`;
			});

			innerHTML1 += "</div>";
			document.getElementById("premadeLogos").innerHTML = innerHTML1; 


			innerHTML2 += "<div class='row'>"; 
			data.data.icons.forEach(function(element){

				innerHTML2 += `
				<div class="col-sm-4 col-md-4">
					<div class="container-photo" style="position: relative;">
						<a class="lightbox" href="`+ element.link + `" >
							<img src="`+ element.link + `" alt="bridge img">
						</a>
						<button type="button" class="btn btn-light" onclick='deletePhoto("` + element.name + `")'><i class="fas fa-trash-alt" aria-hidden="true"></i></button>
						<input type="checkbox">
					</div>
				</div>`;
			});

			innerHTML2 += "</div>";
			document.getElementById("iconsLogos").innerHTML = innerHTML2; 


			innerHTML3 += "<div class='row'>"; 
			data.data.frames.forEach(function(element){

				innerHTML3 += `
				<div class="col-sm-4 col-md-4">
					<div class="container-photo" style="position: relative;">
						<a class="lightbox" href="`+ element.link + `" >
							<img src="` + element.link + `" alt="bridge img">
						</a>
						<button type="button" class="btn btn-light" onclick='deletePhoto("` + element.name + `")' ><i class="fas fa-trash-alt" aria-hidden="true"></i></button>
						<input type="checkbox">
					</div>
				</div>`;
			});

			innerHTML3 += "</div>";
			document.getElementById("framesLogos").innerHTML = innerHTML3; 

   		 baguetteBox.run('.tz-gallery');

		},
		error: function(xhr,status,error)
		{
			alert("Error!");
	}
	});

}



function openTab(evt, nameTab)
{
	console.log("aa");
	//declare all var
	var i, tabcontent, tablinks;
	
	//hide content for all
	tabcontent = document.getElementsByClassName("tabcontent");
	for(i=0;i < tabcontent.length;i++)
	{
	tabcontent[i].style.display = "none";
	}

	//desactivate all links to tabs
	tablinks = document.getElementsByClassName("btn btn-default tablinks");
	for(i=0;i < tablinks.length;i++)
	{
		tablinks[i].className.replace(" active","");
	}
	
	//activate the tab event
	document.getElementById(nameTab).style.display = 'block';
	evt.currentTarget.className += " active";

	if(nameTab == "gallery_tab")
	{
		getLogos();
	}
}


//selecte more function

function deletePhoto(namePhoto)
{
	var body = { name: namePhoto}; 
	console.log(body);
	$.ajax({
		url: 'http://localhost:3000/icons/delete',
		data: body,
		type: 'POST',
		success: function(data){
			console.log(data);
			location.reload();
			
		},
		error: function(xhr,status,error)
		{alert("Error!",error,xhr);
	}
	});
}