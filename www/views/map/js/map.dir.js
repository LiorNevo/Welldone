angular.module('mapApp',[]).directive('myMap', [function() {
	return {
		restrict : 'E',
		templateUrl : 'views/map/templates/map.html',
		scope :{
			location: '='
		},
		controller : ['$scope',function($scope) {
			
		}],
		link : function(scope, elem, attr) {
			/*----------------------------------------------------------------------------------------------------*/
			if (scope.location.coordinates){
				var mymap = L.map('mapid').setView(scope.location.coordinates, 15);
			}
			else {
				var mymap = L.map('mapid').setView([32.48131, 34.98339], 15);
			}
			L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw', {
				maxZoom: 18,
				attribution: '',
				id: 'mapbox.streets'
			}).addTo(mymap);
			/*----------------------------------------------------------------------------------------------------*/
			var marker;
			if (scope.location.coordinates){
				marker = L.marker(scope.location.coordinates);
				marker.addTo(mymap);
			}
			function onMapClick(e) {
				if (!marker){
					marker = L.marker(e.latlng);
					marker.addTo(mymap);
				}
				else {
					marker.setLatLng(e.latlng);
					marker.update();
				}
				scope.location.coordinates = e.latlng;
			}
			/*----------------------------------------------------------------------------------------------------*/
			mymap.on('click', onMapClick);
		}
	}
} ]);