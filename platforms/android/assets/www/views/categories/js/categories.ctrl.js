angular.module('catApp', []).controller('catCtrl',['$scope', 'closeNavBar', function($scope, closeNavBar){
	closeNavBar();
}])