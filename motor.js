//Definimos un punto central para nuestro mapa
	var i = 0;
	var images = [
		["<img src='http://2.bp.blogspot.com/-VgGuN277mxs/VfcBJCfo-SI/AAAAAAAAMgE/ltnLgQyYXnw/s1600/20150914095933%2B%25281%2529.jpg' />"],
		["<img src='http://4.bp.blogspot.com/-7LI6iaOtJiA/VfcBJOceudI/AAAAAAAAMf4/WGShFM4J1fQ/s1600/20150914095933%2B%25282%2529.jpg' />"],
		["<img src='http://2.bp.blogspot.com/-y2sOJvmLcA0/VfcBJszCeHI/AAAAAAAAMgY/CNZM7HPUrLM/s1600/20150914095933%2B%25283%2529.jpg' />"]
		];
	var imagen = 'building.png'; //icono de imagen
	var circle1, circle2, circle3;
	var marker;
	var map;
	var myCenter = new google.maps.LatLng(43.358174, -5.854678);
	var markers = [];
	var banks = [
		['Caja Rural', 43.35589, -5.85099, 1],
		['Banco Sabadell', 43.35575, -5.85053, 2 ],
		['La Caixa', 43.35752, -5.84848, 3]
	];
	var bank;
	var actualBank;
	//var actualBank = new google.maps.LatLng(banks[i][1], banks[i][2]);
	var flighPath;
	var actualPosition;
	var total = 0;

	function initialize(){
		var opciones = {
			center: myCenter,
			zoom: 15,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		map = new google.maps.Map(document.getElementById("googleMap"),opciones);
		
		google.maps.event.addListener(map, 'click', function(event) {
		  setMapOnAll(null);
		  actualPosition = actual(event.latLng);
		  addMarker(event.latLng);		  
		});	
	}
	function actual(location){
		return location;
	}
	function addMarker(location){
		marker = new google.maps.Marker({
			position: location,
			map: map
		});
		markers.push(marker);
	}

	function showBanks() {
		addCircles();
		addPolyline();
		bank = banks[i];
		marker=new google.maps.Marker({
		  position: {lat: bank[1], lng:bank[2]},
		  map: map,
		  icon: {
		      path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
		      scale: 3
		    },
		 // icon: imagen,
		  title: bank[0],
		  zIndex:bank[3]
		  });
		  i++;
			if (i>2) {i=0};					
	}

	function setMapOnAll(map) {
	  for (var j = 0; j < markers.length; j++) {
	    markers[j].setMap(map);
	  }
	}	
	function startSearch(){
		document.getElementById("image").innerHTML=images[i];
		setMapOnAll(null);	
		circle1.setMap(null);
		circle2.setMap(null);
		circle3.setMap(null);
		marker.setMap(null);
		flighPath.setMap(null);			
	}

	function addCircles(){
		bank = banks[i];
		circle1 = new google.maps.Circle({
		  	center: {lat: bank[1], lng:bank[2]}, 
	  		map: map,
	  		radius: 100,
	  		fillColor: '#00FFFF'
		});
		circle2 = new google.maps.Circle({
		  	center: {lat: bank[1], lng:bank[2]}, 
	  		map: map,
	  		radius: 220,
	  		fillColor: '#FF00FF'
		});
		circle3 = new google.maps.Circle({
		  	center: {lat: bank[1], lng:bank[2]}, 
	  		map: map,
	  		radius: 400,
	  		fillColor: '#0000FF'
		});
		circle1.setMap(map);
		circle2.setMap(map);
		circle3.setMap(map);
	}
	function addPolyline(){
		bank = banks[i];
		actualBank = new google.maps.LatLng(bank[1], bank[2]);
		myLine = [actualPosition,actualBank];
//		window.alert(myLine);
		flighPath = new google.maps.Polyline({
			path:myLine,
			strokeColor:"#0000FF",
			strokeOpacity:0.8,
			strokeWeight:2
		});
		flighPath.setMap(map);
		distancia = calcDistance(actualPosition,actualBank);
		puntuacion = calcPoints(distancia);	
		window.alert(puntuacion);
		document.getElementById('total').innerHTML="Puntuacion: <b>"+puntuacion+" puntos</b>";	
		document.getElementById('distance').innerHTML="Distancia: <b>"+distancia+" metros</b>";
	}
	function calcDistance(p1, p2){
		return (google.maps.geometry.spherical.computeDistanceBetween(p1,p2)).toFixed(3);
	}
	function calcPoints(d){
		if (d<100) { total += 100;};
		if (d>100 && d<220) { total+=50;};
		if (d>220 && d<400) {total+=10};
		return total;
	}

//SABADELL
//http://4.bp.blogspot.com/-7LI6iaOtJiA/VfcBJOceudI/AAAAAAAAMf4/WGShFM4J1fQ/s1600/20150914095933%2B%25282%2529.jpg 

//LA CAIXA
//http://2.bp.blogspot.com/-y2sOJvmLcA0/VfcBJszCeHI/AAAAAAAAMgY/CNZM7HPUrLM/s1600/20150914095933%2B%25283%2529.jpg