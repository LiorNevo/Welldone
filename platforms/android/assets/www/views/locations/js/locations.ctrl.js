angular.module('locApp', []).controller('locCtrl',[
                 '$scope',
                 'closeSideBar',
                 'navBarTitle',
                 'toolbarActions',
                 'loadAllLocations',
                 'saveLocation',
                 'deleteLocation',
                 '$mdDialog',
                 '$cordovaEmailComposer',
                 function(
                		 $scope, 
                		 closeSideBar, 
                		 navBarTitle,
                		 toolbarActions,
                		 loadAllLocations,
                		 saveLocation,
                		 deleteLocation,
                		 $mdDialog,
                		 $cordovaEmailComposer){
	closeSideBar();
	navBarTitle('Locations');
	toolbarActions([{
		name: 'Add New Location',
		action: function(){
			$scope.locations.push({});
		},
		icon: 'add'
	}]);
	$scope.globalAttr = globalAttr;
	$scope.locations = loadAllLocations();
	$scope.viewLocation = function(){
		if (navigator.vibrate){
			navigator.vibrate(300);
			 var email = {
					    to: 'max@mustermann.de',
					    cc: 'erika@mustermann.de',
					    subject: 'Cordova Icons',
					    body: 'How are you? Nice greetings from Leipzig'
					  };

					 $cordovaEmailComposer.open(email);
		}
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
	$scope.saveLocation = function(location, ev, inValid) {
		if (!inValid){
			var confirmSave = $mdDialog
			.confirm()
			.title('Save Location?')
			.textContent(
					'Are you sure you want to save ' + location.name + '?')
			.ariaLabel('Save Location')
			.targetEvent(ev).ok('Yes, Save')
			.cancel('No');
			$mdDialog
			.show(confirmSave)
			.then(
					function() {
						saveLocation(location);
					},
					function() {
					});
		}
		else {
			var notValid = $mdDialog
			.alert()
			.clickOutsideToClose(true)
			.title('Not All Fields Are Completed')
			.textContent(
					'You must complete all fields in order to save')
			.ariaLabel('Alert')
			.targetEvent(ev).ok('Ok, Got it!')
			$mdDialog
			.show(notValid);
		}
	}
}])