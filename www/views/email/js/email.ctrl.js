angular.module('emailApp', []).controller('emailCtrl',['$scope', 'closeSideBar','navBarTitle','toolbarActions', function($scope, closeSideBar, navBarTitle, toolbarActions){
	closeSideBar();
	navBarTitle('Email');
	toolbarActions([]);
}])