angular.module('avatarApp', []).controller('avatarCtrl',[
                 '$scope',
                 'navBarTitle',
                 'toolbarActions',
                 'closeSideBar',
                  function(
                		 $scope,
                		 navBarTitle,
                         toolbarActions,
                         closeSideBar){
	navBarTitle('Change Avatar');
	toolbarActions([]);
	closeSideBar();
	$scope.globalAttr = globalAttr;
	$scope.originalImage='';
    $scope.croppedImage='';
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
	$scope.ok = function() {
		if ($scope.croppedImage && $scope.originalImage){
			globalAttr.userAvatar = $scope.croppedImage;
			localStorage.setItem("welldoneUserAvatar", $scope.croppedImage);
		}
	};
	/*----------------------------------------------------------------------------------------------------*/
	$scope.cancel = function() {
		$scope.originalImage='';
	    $scope.croppedImage='';
	};
}])