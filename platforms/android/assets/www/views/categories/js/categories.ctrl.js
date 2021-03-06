angular
		.module('catApp', [])
		.controller(
				'catCtrl',
				[
						'$scope',
						'closeSideBar',
						'$mdDialog',
						'navBarTitle',
						'toolbarActions',
						'loadAllCategories',
						'loadAllLocations',
						'saveCategory',
						'deleteCategory',
						'$mdMedia',
						'$mdDialog',
						'categoryLocationsCtrl',
						function($scope, 
								closeSideBar, 
								$mdDialog, 
								navBarTitle, 
								toolbarActions, 
								loadAllCategories,
								loadAllLocations,
								saveCategory, 
								deleteCategory,
								$mdMedia,
								$mdDialog,
								categoryLocationsCtrl) {
							closeSideBar();
							navBarTitle('Categories');
							toolbarActions([{
								name: 'Add New Category',
								action: function(){
									$scope.categories.push({});
								},
								icon: 'add'
							}]);
							$scope.globalAttr = globalAttr;
							$scope.categories = loadAllCategories();
							$scope.locations = loadAllLocations();
							/*----------------------------------------------------------------------------------------------------*/
							(function matchLocationToCategory(){
								angular.forEach($scope.categories, function(category){
									category.locations = [];
					 				angular.forEach($scope.locations, function(location){
					 					if (location.categories.toString().includes(category.name)){
					 						category.locations.push(location);
					 					}
					 				})
					 			});
							})();
							/*----------------------------------------------------------------------------------------------------*/
							$scope.showCategoryLocations = function(category, ev){
								var customFullscreen = $mdMedia('xs') || $mdMedia('sm');
								var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && customFullscreen;
							    /*----------------------------------------------------------------------------------------------------*/
								$mdDialog.show({
								    controller: categoryLocationsCtrl(),
								    templateUrl: 'views/categories/templates/category-locations-dialog.html',
								    parent: angular.element(document.body),
								    targetEvent: ev,
								    clickOutsideToClose: true,
								    fullscreen: useFullScreen,
								    locals: {
								    	category: category
								    }
								});
							}
							/*----------------------------------------------------------------------------------------------------*/
							$scope.deleteCategory = function(category, ev, index) {
								var confirmDelete = $mdDialog
										.confirm()
										.title('Delete Category?')
										.textContent(
												'Are you sure you want to delete ' + category.name + '?')
										.ariaLabel('Delete Category')
										.targetEvent(ev).ok('Yes, Delete')
										.cancel('No');
								$mdDialog
										.show(confirmDelete)
										.then(
												function() {
													deleteCategory(category);
													$scope.categories.splice(index, 1);
												},
												function() {
												});
							}
							/*----------------------------------------------------------------------------------------------------*/
							$scope.saveCategory = function(category, ev, inValid) {
								if (!inValid){
									var confirmSave = $mdDialog
									.confirm()
									.title('Save Category?')
									.textContent(
											'Are you sure you want to save ' + category.name + '?')
									.ariaLabel('Save Category')
									.targetEvent(ev).ok('Yes, Save')
									.cancel('No');
									$mdDialog
									.show(confirmSave)
									.then(
											function() {
												saveCategory(category);
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
						} ])