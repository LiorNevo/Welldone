angular.module('navBarApp', []);
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
 			'navBarTitle',
 			function($scope, $mdSidenav, loadNavBar, navBarTitle) {
 				$scope.globalAttr = globalAttr;
 				$scope.navBarTitle = navBarTitle;
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
 					[{"label":"Catagories","icon":"layers","sref":"Categories","type":"link","subItems":null},
 					{"label":"Locations","icon":"location_on","sref":"Locations","type":"link","subItems":null},
 					{"label":"Administration","icon":"settings","sref":"","type":"toggle",
 						"subItems":[
 						        {"label":"Users","icon":"views/core/nav-bar/images/users.svg","sref":"Users","type":"link","subItems":null},
 								{"label":"Roles","icon":"vpn_key","sref":"Roles","type":"link","subItems":null},
 									]
 					}]);
 			})
 		}
 	} ]);
 angular.module('navBarApp').factory('closeSideBar',
		 	[ '$mdSidenav', function($mdSidenav) {
		 		return function() {
		 			$mdSidenav('sidenav').close();
		 		}
		 	} ]);
 angular.module('navBarApp').factory('navBarTitle',
		 	[ function() {
		 		var title = 'Home';
		 		return function(newTitle) {
		 			if (newTitle){
		 				title = newTitle;
		 			}
		 			return title;
		 		}
		 	} ]);
 angular.module('navBarApp').factory('toolbarActions',
		 	[ function() {
		 		var actions = [];
		 		return function(newActions) {
		 			if (newActions){
		 				actions = newActions;
		 			}
		 			return actions;
		 		}
		 	} ]);
 angular.module('navBarApp').factory('avatarDialog',
			[ '$mdMedia', '$mdDialog',function($mdMedia, $mdDialog) {
				return function(ev, okFunction) {
					var customFullscreen = $mdMedia('xs') || $mdMedia('sm');
					var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && customFullscreen;
				    /*----------------------------------------------------------------------------------------------------*/
					var changeAvatarCtrl = function($scope, $mdDialog) {
						$scope.originalImage='';
					    $scope.croppedImage='';
					    $scope.globalAttr = globalAttr;
					    $scope.handleFileSelect = function(evt) {
							var file = evt.currentTarget.files[0];
							var reader = new FileReader();
							reader.onload = function (evt) {
								$scope.$apply(function($scope){
									$scope.originalImage = evt.target.result;
								});
							};
							reader.readAsDataURL(file);
					    };
						/*----------------------------------------------------------------------------------------------------*/
						$scope.cancel = function() {
							$mdDialog.cancel();
						};
						/*----------------------------------------------------------------------------------------------------*/
						$scope.ok = function() {
							okFunction($scope.croppedImage);
							$mdDialog.cancel();
						};
					}
				    /*----------------------------------------------------------------------------------------------------*/
					$mdDialog.show({
					    controller: changeAvatarCtrl,
					    templateUrl: 'views/core/change-avatar/templates/change-avatar.html',
					    parent: angular.element(document.body),
					    targetEvent: ev,
					    clickOutsideToClose: true,
					    fullscreen: useFullScreen
					});
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
				['avatarDialog','toolbarActions', function(avatarDialog, toolbarActions) {
					return {
						scope : {
							
						},
						templateUrl : 'views/core/nav-bar/templates/toolbar-menu.html',
						link : function(scope, element, attr) {
							scope.toolbarActions = toolbarActions;
							scope.globalAttr = globalAttr;
							var defaultAvatar = 'views/core/nav-bar/images/male-avatar.svg';
							/*----------------------------------------------------------------------------------------------------*/
							scope.getUserAvatar = function(){
								if(globalAttr.userAvatar && globalAttr.userAvatar != 'null'){
									return globalAttr.userAvatar;
								}
								else {
									return defaultAvatar;
								}
							}
							/*----------------------------------------------------------------------------------------------------*/
							scope.changeAvatar = function(ev){
								avatarDialog(ev, function(croppedImage){
									globalAttr.userAvatar = croppedImage;
									localStorage.setItem("welldoneUserAvatar", croppedImage);
								});
							}
						}
					};
				} ]);