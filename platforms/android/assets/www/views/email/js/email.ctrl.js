angular.module('emailApp', []).controller('emailCtrl',['$scope', 
                                                       'closeSideBar',
                                                       'navBarTitle',
                                                       'toolbarActions',
                                                       'loadAllLocations',
                                                       'loadAllCategories',
                                                       '$filter',
                                         function($scope, 
                                        		 closeSideBar, 
                                        		 navBarTitle, 
                                        		 toolbarActions,
                                        		 loadAllLocations,
                                        		 loadAllCategories,
                                        		 $filter){
	closeSideBar();
	navBarTitle('Email');
	toolbarActions([]);
	$scope.categories = loadAllCategories();
	$scope.locations = loadAllLocations();
	$scope.locationsFileCreated = false;
	$scope.categoriesFileCreated = false;
	$scope.toEmails = [];
	/*----------------------------------------------------------------------------------------------------*/
	$scope.newChip = function($chip){
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (re.test($chip)){
			$scope.toEmails.push($chip);
		}
		return null;
	}
	/*----------------------------------------------------------------------------------------------------*/
	$scope.createFiles = function(){
		$scope.timestamp = $filter('date')(new Date(), 'yyyyMMddHHmmss');
		window.resolveLocalFileSystemURL(cordova.file.externalDataDirectory, function(dir) {
	        dir.getFile("categories" + $scope.timestamp + ".txt", {create:true}, function(file) {
	            file.createWriter(function(fileWriter) {
	    	        fileWriter.seek(fileWriter.length);
	    	        var str = angular.toJson($scope.categories);
	    	        fileWriter.write(str);
	    	        $scope.categoriesFileCreated = true;
	    	    }, function(){});
	        });
	        dir.getFile("locations" + $scope.timestamp + ".txt", {create:true}, function(file) {
	            file.createWriter(function(fileWriter) {
	    	        fileWriter.seek(fileWriter.length);
	    	        var str = angular.toJson($scope.locations);
	    	        fileWriter.write(str);
	    	        $scope.locationsFileCreated = true;
	    	    }, function(){});
	        });
	        
	    });
	};
	$scope.createFiles();
	/*----------------------------------------------------------------------------------------------------*/
	$scope.email = function(){
		cordova.plugins.email.isAvailable(
			    function (isAvailable) {
			    	if (isAvailable){
			    		$scope.sendTheEmail();
			    	}
			    	else {
			    		
			    	}
			    }
			);
	}
	/*----------------------------------------------------------------------------------------------------*/
	$scope.sendTheEmail = function(){
		if (!$scope.categoriesFileCreated || !$scope.locationsFileCreated) return;
		cordova.plugins.email.open({
		    to:      $scope.toEmails,
		    subject: 'myLocations Categories and Locations',
		    attachments: [cordova.file.externalDataDirectory + "categories" + $scope.timestamp + ".txt", 
		                  cordova.file.externalDataDirectory + "locations" + $scope.timestamp + ".txt"],
		    body:    'Hi, attached are the files containing information regarding your Categories and Locations'
		});
	}
}])