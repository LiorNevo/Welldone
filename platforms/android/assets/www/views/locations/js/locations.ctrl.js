angular.module('locApp', []).controller('locCtrl',['$scope','closeNavBar', function($scope, closeNavBar){
	closeNavBar();
}])