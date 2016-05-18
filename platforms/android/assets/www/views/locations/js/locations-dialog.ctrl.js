angular.module('locApp').factory('locationDialogCtrl',
	 	[ '$mdDialog','saveLocation', 'loadAllCategories', function($mdDialog, saveLocation,loadAllCategories) {
	 		return function() {
	 			return function($scope, location){
	 				$scope.location = location;
	 				$scope.globalAttr = globalAttr;
	 				$scope.categories = loadAllCategories();
	 				/*----------------------------------------------------------------------------------------------------*/
	 				$scope.cancel = function(){
	 					$mdDialog.cancel();
	 				}
	 				/*----------------------------------------------------------------------------------------------------*/
	 				$scope.save = function(ev, inValid) {
	 					if (navigator.notification){
	 						$scope.phoneNotification(inValid);
	 					}
	 					else {
	 						$scope.webNotification(ev, inValid)
	 					}
	 				}
	 				/*----------------------------------------------------------------------------------------------------*/
	 				$scope.phoneNotification = function(inValid){
	 					if (!inValid){
	 						navigator.notification.confirm(
	 							    'Are you sure you want to save ' + $scope.location.name + '?',
	 							    function(index){
	 							    	if (index == 1){
	 							    		saveLocation($scope.location);
	 							    		$mdDialog.cancel();
	 							    	}
	 							    },
	 							    'Save Location?', 
	 							    ['Yes, Save','No'] 
	 							);
	 					}
	 					else {
	 						navigator.notification.alert(
	 							    'You must complete all fields in order to save',
	 							    function(){}, 
	 							    'Not All Fields Are Completed', 
	 							    'Ok, Got it!' 
	 							);
	 					}
	 				}
	 				/*----------------------------------------------------------------------------------------------------*/
	 				$scope.webNotification = function (ev, inValid){
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
	 									$mdDialog.cancel();
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
	 			}
	 		}
	 	} ]);