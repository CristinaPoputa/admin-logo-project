function LogIn()
{
	var xhttp = new XMLHttpRequest();
	var username = document.getElementById('username').value;
	var password = document.getElementById('password').value;
	var body = {
				username: username,
				password: password
				};
	$.ajax({
		url: 'http://localhost:3000/users/login',
		data: body,
		type: 'POST',
		success: function(data){
			
			//change the location
			location.href = "home.html";

			if(typeof(Storage)!=="undefined")
			{
				sessionStorage.setItem("user",JSON.stringify(data));
			}
		},
		error: function(xhr,status,error)
		{alert("Error!");
	}
	});
	xhttp.open("GET",body);
	xhttp.send();
}
