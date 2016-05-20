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