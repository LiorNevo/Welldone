angular.module('locApp').factory('mapCtrl',
	 	[ '$mdDialog', function($mdDialog) {
	 		return function() {
	 			return function($scope, location){
	 				$scope.location = location;
	 				$scope.globalAttr = globalAttr;
	 				/*----------------------------------------------------------------------------------------------------*/
	 				$scope.cancel = function(){
	 					$mdDialog.cancel();
	 				}
	 			}
	 		}
	 	} ]);