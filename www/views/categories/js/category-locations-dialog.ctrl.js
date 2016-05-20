angular.module('catApp').factory('categoryLocationsCtrl',
	 	[ '$mdDialog', function($mdDialog) {
	 		return function() {
	 			return function($scope, category){
	 				$scope.category = category;
	 				$scope.globalAttr = globalAttr;
	 				/*----------------------------------------------------------------------------------------------------*/
	 				$scope.cancel = function(){
	 					$mdDialog.cancel();
	 				}
	 			}
	 		}
	 	} ]);