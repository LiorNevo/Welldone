angular.module('welldoneApp', [  
                                 'ngMaterial', 
                                 'navBarApp', 
                                 'ui.router', 
                                 'homeApp', 
                                 'bottomToolbarApp', 
                                 'catApp', 
                                 'locApp', 
                                 'ngAnimate', 
                                 'anim-in-out',
                                 'ngImgCrop',
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
	});
}])