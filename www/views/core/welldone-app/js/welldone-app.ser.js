/*----------------------------------------------------------------------------------------------------*/
/**
 * Category Services
 */
angular.module('welldoneApp').factory('loadAllCategories',
		 	[ function() {
		 		return function() {
		 			try {
						var categories = angular.fromJson(localStorage
								.getItem("welldoneCategories"));
					} catch (e) {
						categories = [{}];
					}
					if (!categories) {
		 				categories = [{}];
		 			}
		 			return categories;
		 		}
		 	} ]);

angular.module('welldoneApp').factory('saveCategory',
		 	[ 'loadAllCategories', function(loadAllCategories) {
		 		return function(saveCategory) {
		 			var categories = loadAllCategories();
		 			var found = false;
		 			var index = 0;
		 			var lastId = 0;
		 			angular.forEach(categories, function(category){
		 				if (category.id >= lastId){
		 					lastId = category.id + 1;
		 				}
		 				if (category.id == saveCategory.id){
		 					found = true;
		 					categories.splice(index, 1);
		 					if (!saveCategory.id){
		 						saveCategory.id = lastId;
		 					}
		 					categories.push(saveCategory);
		 				}
		 				index++;
		 			});
		 			if (!found){
		 				saveCategory.id = lastId;
		 				categories.push(saveCategory);
		 			}
		 			localStorage.setItem("welldoneCategories", angular.toJson(categories));
		 		}
		 	} ]);
angular.module('welldoneApp').factory('deleteCategory',
	 	[ 'loadAllCategories', function(loadAllCategories) {
	 		return function(deletCategory) {
	 			var oldCategories = loadAllCategories();
	 			var newCategories = [];
	 			angular.forEach(oldCategories, function(category){
	 				if (category.id != deletCategory.id){
	 					newCategories.push(category);
	 				}
	 			});
	 			localStorage.setItem("welldoneCategories", angular.toJson(newCategories));
	 		}
	 	} ]);
/*----------------------------------------------------------------------------------------------------*/
/**
 * Location Services
 */
angular.module('welldoneApp').factory('loadAllLocations',
		 	[ function() {
		 		return function() {
		 			try {
						var locations = angular.fromJson(localStorage
								.getItem("welldoneLocations"));
					} catch (e) {
						locations = [{}];
					}
					if (!locations) {
		 				locations = [{}];
		 			}
		 			return locations;
		 		}
		 	} ]);

angular.module('welldoneApp').factory('saveLocation',
		 	[ 'loadAllLocations', function(loadAllLocations) {
		 		return function(saveLocation) {
		 			var locations = loadAllLocations();
		 			var found = false;
		 			var index = 0;
		 			var lastId = 0;
		 			angular.forEach(locations, function(location){
		 				if (location.id >= lastId){
		 					lastId = location.id + 1;
		 				}
		 				if (location.id == saveLocation.id){
		 					found = true;
		 					locations.splice(index, 1);
		 					if (!saveLocation.id){
		 						saveLocation.id = lastId;
		 					}
		 					locations.push(saveLocation);
		 				}
		 				index++;
		 			});
		 			if (!found){
		 				saveLocation.id = lastId;
		 				locations.push(saveLocation);
		 			}
		 			localStorage.setItem("welldoneLocations", angular.toJson(locations));
		 		}
		 	} ]);
angular.module('welldoneApp').factory('deleteLocation',
	 	[ 'loadAllLocations', function(loadAllLocations) {
	 		return function(deletLocation) {
	 			var oldLocations = loadAllLocations();
	 			var newLocations = [];
	 			angular.forEach(oldLocations, function(location){
	 				if (location.id != deletLocation.id){
	 					newLocations.push(location);
	 				}
	 			});
	 			localStorage.setItem("welldoneLocations", angular.toJson(newLocations));
	 		}
	 	} ]);
angular.module('welldoneApp').factory('clickToMap',
	 	[ '$mdMedia','$mdDialog','mapCtrl', function($mdMedia, $mdDialog, mapCtrl) {
	 		return function(ev, location){
	 			var customFullscreen = $mdMedia('xs') || $mdMedia('sm');
	 			var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && customFullscreen;
	 		    /*----------------------------------------------------------------------------------------------------*/
	 			$mdDialog.show({
	 			    controller: mapCtrl(),
	 			    templateUrl: 'views/locations/templates/map-dialog.html',
	 			    parent: angular.element(document.body),
	 			    targetEvent: ev,
	 			    clickOutsideToClose: true,
	 			    fullscreen: useFullScreen,
	 			    locals: {
	 			    	location: location
	 			    }
	 			});
	 		}
	 	} ]);