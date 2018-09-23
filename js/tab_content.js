
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
	

});



function openTab(evt, nameTab)
{
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
}


//selecte more function

function selectMore()
{
	
}