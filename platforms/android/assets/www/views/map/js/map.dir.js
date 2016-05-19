angular.module('mapApp',[]).directive('myMap', [function() {
	return {
		restrict : 'E',
		templateUrl : 'views/map/templates/map.html',
		scope :{
			
		},
		controller : ['$scope',function($scope) {
			
		}],
		link : function(scope, elem, attr) {
			var mymap = L.map('mapid').setView([32.48131, 34.98339], 15);

			L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw', {
				maxZoom: 18,
				attribution: '',
				id: 'mapbox.streets'
			}).addTo(mymap);
			var popup = L.popup();
			function onMapClick(e) {
				var marker = L.marker(e.latlng).addTo(mymap);
			}

			mymap.on('dblclick', onMapClick);
		}
	}
} ]);