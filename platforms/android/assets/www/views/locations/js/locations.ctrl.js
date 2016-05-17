angular.module('locApp', []).controller('locCtrl',['$scope','closeSideBar','navBarTitle', function($scope, closeSideBar, navBarTitle){
	closeSideBar();
	navBarTitle('Locations');
}])