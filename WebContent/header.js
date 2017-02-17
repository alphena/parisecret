/**
 * 
 */

function toggleGroup(div,type) {
	var className=div.getAttribute("class");
	if (className=="normal"){
		div.className="selected";
	}
	else{
		div.className="normal";
	}
	
	

				for (var i = 0; i < markerGroups[type].length; i++) {
					var marker = markerGroups[type][i];
					if (marker.isHidden()) {
					  marker.show();
					} else {
					  marker.hide();
					}
				} 
			}


function initialize() {
}