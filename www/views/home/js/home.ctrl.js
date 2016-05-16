angular.module('homeApp', []).controller('homeCtrl',['$scope', 'closeNavBar', function($scope, closeNavBar){
	closeNavBar();
}])