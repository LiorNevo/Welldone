angular.module('welldoneApp', [  
                                 'ngMaterial', 
                                 'navBarApp', 
                                 'ui.router', 
                                 'homeApp', 
                                 'bottomToolbarApp', 
                                 'catApp', 
                                 'locApp',
                                 'avatarApp', 
                                 'ngAnimate', 
                                 'anim-in-out',
                                 'ngImgCrop',
                                 'mapApp',
                                 'ngMessages']).config(['$stateProvider','$urlRouterProvider',
    function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise('/');
	$stateProvider
	
	.state('Home', {
		url: '/',
		templateUrl : 'views/home/templates/home.html',
		controller: 'homeCtrl'
	})
	
	.state('Categories', {
		url: '/Categories',
		templateUrl : 'views/categories/templates/categories.html',
		controller: 'catCtrl'
	})
	
	.state('Locations', {
		url: '/Locations',
		templateUrl : 'views/locations/templates/locations.html',
		controller: 'locCtrl'
	})
	
	.state('ChangeAvatar', {
		url: '/ChangeAvatar',
		templateUrl : 'views/core/change-avatar/templates/change-avatar.html',
		controller: 'avatarCtrl'
	});
}])