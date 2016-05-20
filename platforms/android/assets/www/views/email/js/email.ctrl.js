angular.module('emailApp', []).controller('emailCtrl',['$scope', 
                                                       'closeSideBar',
                                                       'navBarTitle',
                                                       'toolbarActions',
                                                       'loadAllLocations',
                                                       'loadAllCategories',
                                         function($scope, 
                                        		 closeSideBar, 
                                        		 navBarTitle, 
                                        		 toolbarActions,
                                        		 loadAllLocations,
                                        		 loadAllCategories){
	closeSideBar();
	navBarTitle('Email');
	toolbarActions([]);
	$scope.categories = loadAllCategories();
	$scope.locations = loadAllLocations();
	/*----------------------------------------------------------------------------------------------------*/
	$scope.email = function(){
		window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(dir) {
	        console.log("got main dir",dir);
	        dir.getFile("temp.txt", {create:true}, function(file) {
	            console.log("got the file", file);
	            file.createWriter(function(fileWriter) {
	    	        fileWriter.seek(fileWriter.length);
	    	        var str = angular.toJson($scope.categories);
	    	        fileWriter.write(str);
	    	        console.log("ok, in theory i worked");
	    	    }, function(){});
	        });
	    });
		
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
		cordova.plugins.email.open({
		    to:      'max@mustermann.de',
		    subject: 'Greetings',
		    body:    'How are you? Nice greetings from Leipzig'
		});
	}
}])