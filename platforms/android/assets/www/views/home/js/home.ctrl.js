angular.module('homeApp', []).controller('homeCtrl',['$scope', 'closeSideBar','navBarTitle','toolbarActions', function($scope, closeSideBar, navBarTitle, toolbarActions){
	closeSideBar();
	navBarTitle('Home');
	toolbarActions([]);
}])