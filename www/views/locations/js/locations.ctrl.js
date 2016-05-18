angular.module('locApp', []).controller('locCtrl',[
                 '$scope',
                 'closeSideBar',
                 'navBarTitle',
                 'toolbarActions',
                 'loadAllLocations',
                 'deleteLocation',
                 '$mdDialog',
                 '$mdMedia',
                 'locationDialogCtrl',
                 'loadAllCategories',
                 'mapCtrl',
                 function(
                		 $scope, 
                		 closeSideBar, 
                		 navBarTitle,
                		 toolbarActions,
                		 loadAllLocations,
                		 deleteLocation,
                		 $mdDialog,
                		 $mdMedia,
                		 locationDialogCtrl,
                		 loadAllCategories,
                		 mapCtrl){
	closeSideBar();
	navBarTitle('Locations');
	toolbarActions([{
		name: 'Add New Location',
		action: function(){
			if ($scope.checkCategories()){
				$scope.locations.push({});
			}
		},
		icon: 'add_location'
	}]);
	$scope.globalAttr = globalAttr;
	$scope.locations = loadAllLocations();
	$scope.allCategories = loadAllCategories();
	$scope.groupByCategories = false;
	$scope.toggleGoupByCategories = function(){
		$scope.groupByCategories = !$scope.groupByCategories;
	}
	/*----------------------------------------------------------------------------------------------------*/
	$scope.viewLocation = function(location, ev){
		if (navigator.vibrate){
			navigator.vibrate(300);
		}
		var customFullscreen = $mdMedia('xs') || $mdMedia('sm');
		var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && customFullscreen;
	    /*----------------------------------------------------------------------------------------------------*/
		$mdDialog.show({
		    controller: locationDialogCtrl(),
		    templateUrl: 'views/locations/templates/location-dialog.html',
		    parent: angular.element(document.body),
		    targetEvent: ev,
		    clickOutsideToClose: true,
		    fullscreen: useFullScreen,
		    locals: {
		    	location: location
		    }
		});
	}
	
	/*----------------------------------------------------------------------------------------------------*/
	$scope.deleteLocation = function(location, ev, index) {
		var confirmDelete = $mdDialog
				.confirm()
				.title('Delete Location?')
				.textContent(
						'Are you sure you want to delete ' + location.name + '?')
				.ariaLabel('Delete Location')
				.targetEvent(ev).ok('Yes, Delete')
				.cancel('No');
		$mdDialog
				.show(confirmDelete)
				.then(
						function() {
							deleteLocation(location);
							$scope.locations.splice(index, 1);
						},
						function() {
						});
	}
	/*----------------------------------------------------------------------------------------------------*/
	$scope.checkCategories = function(){
		if (loadAllCategories().length > 0){
			return true;
		}
		else {
			var addCategoryFirst = $mdDialog
			.alert()
			.clickOutsideToClose(true)
			.title('No Categories Available')
			.textContent(
					'You should first add a category then add a location')
			.ariaLabel('Alert').ok('Ok, Got it!')
			$mdDialog
			.show(addCategoryFirst);
			return false;
		}
		
	}
	/*----------------------------------------------------------------------------------------------------*/
	$scope.clickToMap = function(ev, location){
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
}])