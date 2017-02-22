			
			var map;
			
//	Ca c'est la fonction qui definit la carte.
		
			function myMap() {
				var myCenter = new google.maps.LatLng(48.857433,2.345564);
				var mapProp = {
					center:myCenter,
					zoom: 12,
					streetViewControl: false,
					draggable : true,
					mapTypeControl: false,	
					mapTypeId: google.maps.MapTypeId.ROADMAP,
						styles: [
							{
								featureType: "all",
								elementType: "labels",
								stylers: [
									{visibility: "off"}
								]
							},{
								featureType: "all",
								elementType: "geometry",
								stylers: [
									{ lightness: -20},
									{ saturation: -50 }
								]
							},{
								featureType: "road",
								elementType: "geometry",
								stylers: [
									{ hue: "#66b5ff" },
									{ visibility: "simplified" }, 
									{ lightness: 100 }, 
									{ saturation: -100 }
								]
							},{
								featureType: "administrative",
								elementType: "all",
								stylers: [
									{ visibility: "off" }
								]
							},{
								featureType: "landscape",
								elementType: "geometry",
								stylers: [
									{ color: "#d1d6e0" },
									{ visibility: "on" } 
								]
							},{
								featureType: "poi",
								elementType: "geometry",
								stylers: [
									{visibility: "off"}
								]
							},{
								featureType: "water",
								elementType: "geometry",
								stylers: [
									{ color: "#3a5978"}
								]
							},{
								featureType: "transit.line",
								elementType: "geometry",
								stylers: [
									{ visibility: "simplified"}
								]
							}
						]
				};
				
				map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
				
				setMarkers(map);
				return map;
			}

//	Ca c'est le tableau qui va etre rempli avec les marqueurs (qui peuvent etre facilement compris par google maps)
			
			var theMarkers = [];

// 	Ca c'est le tableau qu'on remplira (avec une ligne par marqueur) Pour le moment, c'est des marqueurs de test. 
//	Y'a 2 'categories' de lieux pour tester, c'est 'lieu' et 'random'
			
			var endroits = [
				['printemps',48.873804, 2.327821,'lieu'],
				['ourcq',48.887175, 2.384645,'lieu'],
				['appart',48.826583, 2.348066,'lieu'],
				['random1',48.876485,2.359012,'random']
			];
			
//	Ca c'est la fonction qui cree les marqueurs sur la carte (et qui les ajoute dans les tableau theMarkers)
			
			function setMarkers(map) {
				var image = {
					url: 'pointer.png',
					size: new google.maps.Size(50,50),
					origin: new google.maps.Point(0,0),
					anchor: new google.maps.Point(0,25)					
				};
				var shape = {
					coords: [1, 1, 1, 30, 30, 30, 30, 1],
					type: 'poly'
				};
				for (var i = 0; i < endroits.length; i++) {
					var endroit = endroits[i];
					var marker = new google.maps.Marker({
						position: {lat: endroit[1], lng: endroit[2]},
						map: map,
						icon: image,						
						title: endroit[0],
						shape: shape,
						type: endroit[3]
					});
					theMarkers.push(marker);
				}
				for (var i = 0; i<theMarkers.length; i++) {
					theMarkers[i].setVisible(false);
				}
			}
			

//	Et ca c'est la fonction qui doit faire disparaitre ou reapparaitre les marqueurs. 

			
			function markers2(type) {
				for (var i = 0; i<theMarkers.length; i++) {
					if (theMarkers[i].type == type) {
						if (theMarkers[i].getVisible() == false) {
							document.getElementById(type).style.backgroundColor = "#667899";
							theMarkers[i].setVisible(true);
						} else {
							document.getElementById(type).style.backgroundColor = "#29303d";
							theMarkers[i].setVisible(false);
						}
					}		
				}
			}
			
					