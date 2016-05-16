angular.module('bottomToolbarApp', []);
/*----------------------------------------------------------------------------------------------------*/
/**
 * Directive
 */
 angular
 .module('bottomToolbarApp')
 .directive(
 	'bottomToolbar',
 	[function() {
 		return {
 			restrict : 'E',
 			templateUrl : 'views/core/bottom-toolbar/templates/bottom-toolbar.html',
 			scope : {
 				currentState: '@'
 			},
 			controller : [
 			'$scope',
 			function($scope) {
 				$scope.isOpen = false;
 				$scope.states = [];
 				if ($scope.currentState != 'Home'){
 					$scope.states.push({
 						labe: 'home',
 						icon: 'home',
 						ref: 'Home'
 					});
 				}
 				if ($scope.currentState != 'Categories'){
 					$scope.states.push({
 						label: 'categories',
 						icon: 'layers',
 						ref: 'Categories'
 					});
 				}
 				if ($scope.currentState != 'Locations'){
 					$scope.states.push({
 						label: 'locations',
 						icon: 'location_on',
 						ref: 'Locations'
 					});
 				}
 			}],
 			link : function(scope, elem, attr) {
 				
 			}
 		}
 	} ]);