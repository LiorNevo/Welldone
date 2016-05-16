angular.module('navBarApp', [ 'ngMaterial' ]);
/*----------------------------------------------------------------------------------------------------*/
/**
 * Directive
 */
 angular
 .module('navBarApp')
 .directive(
 	'navBar',
 	[function() {
 		return {
 			restrict : 'E',
 			templateUrl : 'views/core/nav-bar/templates/nav-bar.html',
 			transclude : true,
 			scope : {
 				initialSelectedItem : '@',
 			},
 			controller : [
 			'$scope',
 			'$mdSidenav',
 			'loadNavBar',
 			function($scope, $mdSidenav, loadNavBar) {
 				$scope.globalAttr = globalAttr;
 				/*----------------------------------------------------------------------------------------------------*/
 				$scope.toggleSidenav = function() {
 					return $mdSidenav(
 						'sidenav')
 					.toggle();
 				};
 				/*----------------------------------------------------------------------------------------------------*/
 				this.itemClicked = function(menuItem){
 					if ($scope.selectedItem === menuItem){
 						$scope.selectedItem = null;
 					}
 					else {
 						$scope.selectedItem = menuItem;
 					}
 				};
 				/*----------------------------------------------------------------------------------------------------*/
 				this.isOpen = function(menuItem){
 					if ($scope.selectedItem === menuItem){
 						return true;
 					}
 					else {
 						return false;
 					}
 				};
 				/*----------------------------------------------------------------------------------------------------*/
 				$scope.progressMode = 'indeterminate';
 				/*----------------------------------------------------------------------------------------------------*/
 				loadNavBar().then(function(result) {
 					$scope.list = result;
 					$scope.progressMode = '';
 					$scope.setSelectedItem($scope.list, $scope.initialSelectedItem);
 				}, function(error) {
 					$scope.progressMode = '';
 				});
 				/*----------------------------------------------------------------------------------------------------*/
 				$scope.setSelectedItem = function(list, initialSelectedItem){
 					if (!initialSelectedItem) return;
 					if (!angular.isArray(list));
 					loop: for (var i = 0; i < list.length; i++){
 						var item = list[i];
 						if (item.label == initialSelectedItem){
 							$scope.selectedItem = item;
 							item.selected = true;
 							break;
 						}
 						if (item.subItems){
 							var subItems = item.subItems;
 							for (var j = 0; j < subItems.length; j++){
 								var subItem = subItems[j];
 								if (subItem.label == initialSelectedItem){
 									$scope.selectedItem = item;
 									subItem.selected = true;
 									break loop;
 								}
 							}
 						}
 					}
 				}
 			} ],
 			link : function(scope, elem, attr) {
 				
 			}
 		}
 	} ]);
 /*----------------------------------------------------------------------------------------------------*/
/**
 * Configuration
 */
 angular.module('navBarApp').config(
 	[
 	'$mdThemingProvider',
 	'$mdIconProvider',
 	function($mdThemingProvider, $mdIconProvider) {
 		var customPrimary = {
 			'50': '#b9cdd8',
 			'100': '#a9c1cf',
 			'200': '#98b5c6',
 			'300': '#88aabd',
 			'400': '#779eb4',
 			'500': '#6792AB',
 			'600': '#5886a0',
 			'700': '#4f7890',
 			'800': '#466a7f',
 			'900': '#3d5d6f',
 			'A100': '#cad9e1',
 			'A200': '#dae4eb',
 			'A400': '#eaf0f4',
 			'A700': '#344f5e'
 		};
 		$mdThemingProvider
 		.definePalette('customPrimary', 
 			customPrimary);

 		var customAccent = {
 			'50': '#b2cedf',
 			'100': '#a0c3d7',
 			'200': '#8eb8d0',
 			'300': '#7cadc8',
 			'400': '#6aa1c1',
 			'500': '#5896B9',
 			'600': '#498aae',
 			'700': '#427c9c',
 			'800': '#3a6d8a',
 			'900': '#325f78',
 			'A100': '#c4dae6',
 			'A200': '#d6e5ee',
 			'A400': '#e8f0f5',
 			'A700': '#2b5166'
 		};
 		$mdThemingProvider
 		.definePalette('customAccent', 
 			customAccent);

 		var customWarn = {
 			'50': '#ffb280',
 			'100': '#ffa266',
 			'200': '#ff934d',
 			'300': '#ff8333',
 			'400': '#ff741a',
 			'500': '#ff6400',
 			'600': '#e65a00',
 			'700': '#cc5000',
 			'800': '#b34600',
 			'900': '#993c00',
 			'A100': '#ffc199',
 			'A200': '#ffd1b3',
 			'A400': '#ffe0cc',
 			'A700': '#803200'
 		};
 		$mdThemingProvider
 		.definePalette('customWarn', 
 			customWarn);

 		var customBackground = {
 			'50': '#ffffff',
 			'100': '#fefefe',
 			'200': '#ecf3f6',
 			'300': '#dbe7ee',
 			'400': '#c9dce6',
 			'500': '#B8D0DE',
 			'600': '#a7c4d6',
 			'700': '#95b9ce',
 			'800': '#84adc6',
 			'900': '#72a2be',
 			'A100': '#ffffff',
 			'A200': '#ffffff',
 			'A400': '#ffffff',
 			'A700': '#6196b6'
 		};
 		$mdThemingProvider
 		.definePalette('customBackground', 
 			customBackground);

 		$mdThemingProvider.theme('default')
 		.primaryPalette('customPrimary')
 		.accentPalette('customAccent')
 		.warnPalette('customWarn')
 		.backgroundPalette('customBackground')
 	} ]);
 /*----------------------------------------------------------------------------------------------------*/
/**
 * Services
 */
 angular.module('navBarApp').factory('loadNavBar',
 	[ '$q', function($q) {
 		return function() {
 			return $q(function(resolve) {
 				resolve(
 					[{"label":"Startup Assessment","icon":"star_rate","href":"/StartupAssessment","type":"link","subItems":null},
 					{"label":"Proposal Engine","icon":"pie_chart","href":"/ProposalEngine","type":"link","subItems":null},
 					{"label":"Administration","icon":"settings","href":"","type":"toggle",
 						"subItems":[{"label":"Users","icon":"views/core/nav-bar/images/users.svg","href":"/Users","type":"link","subItems":null},
 								{"label":"Roles","icon":"vpn_key","href":"/Roles","type":"link","subItems":null},
 								{"label":"Processes","icon":"views/core/nav-bar/images/flow-diagram.svg","href":"/Processes","type":"link","subItems":null}
 									]
 					}]);
 			})
 		}
 	} ]);
 /*----------------------------------------------------------------------------------------------------*/
/**
 * Menu toggle
 */
angular.module('navBarApp').directive('navbarMenuToggle', [ function() {
	return {
		scope : {
			item : '=',
		},
		require : '^^navBar',
		templateUrl : 'views/core/nav-bar/templates/menu-toggle.html',
		link : function(scope, element, attr, parentController) {
			scope.globalAttr = globalAttr;
			scope.isOpen = function(){
				return parentController.isOpen(scope.item);
			};
			scope.click = function(){
				parentController.itemClicked(scope.item);
			};
		}
	};
} ]);
/*----------------------------------------------------------------------------------------------------*/
/**
 * Menu link
 */
angular
		.module('navBarApp')
		.directive(
				'navbarMenuLink',
				[ function() {
					return {
						scope : {
							item : '=',
						},
						require : '^^navBar',
						templateUrl : 'views/core/nav-bar/templates/menu-link.html',
						link : function(scope, element, attr, parentController) {
							scope.globalAttr = globalAttr;
						}
					};
				} ]);
/*----------------------------------------------------------------------------------------------------*/
/**
 * Toolbar Menu
 */
angular
		.module('navBarApp')
		.directive(
				'toolbarMenu',
				[ function() {
					return {
						scope : {
							
						},
						templateUrl : 'views/core/nav-bar/templates/toolbar-menu.html',
						link : function(scope, element, attr) {
							scope.globalAttr = globalAttr;
							var avatars = ['views/core/nav-bar/images/male-avatar.svg'];
							/*----------------------------------------------------------------------------------------------------*/
							scope.getUserAvatar = function(){
								return avatars[0];
							}
							/*----------------------------------------------------------------------------------------------------*/
							scope.logout = function(){
								alert("logout");
							}
						}
					};
				} ]);