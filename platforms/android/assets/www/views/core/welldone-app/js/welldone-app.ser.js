 /*----------------------------------------------------------------------------------------------------*/
/**
 * Category Services
 */
angular.module('welldoneApp').factory('loadAllCategories',
		 	[ function() {
		 		return function() {
		 			try {
						var categories = angular.fromJson(localStorage
								.getItem("welldoneCategories"));
					} catch (e) {
						categories = [{}];
					}
					if (!categories) {
		 				categories = [{}];
		 			}
		 			return categories;
		 		}
		 	} ]);

angular.module('welldoneApp').factory('saveCategory',
		 	[ 'loadAllCategories', function(loadAllCategories) {
		 		return function(saveCategory) {
		 			var categories = loadAllCategories();
		 			var found = false;
		 			var index = 0;
		 			var lastId = 0;
		 			angular.forEach(categories, function(category){
		 				if (category.id >= lastId){
		 					lastId = category.id + 1;
		 				}
		 				if (category.id == saveCategory.id){
		 					found = true;
		 					categories.splice(index, 1);
		 					if (!saveCategory.id){
		 						saveCategory.id = lastId;
		 					}
		 					categories.push(saveCategory);
		 				}
		 				index++;
		 			});
		 			if (!found){
		 				saveCategory.id = lastId;
		 				categories.push(saveCategory);
		 			}
		 			localStorage.setItem("welldoneCategories", angular.toJson(categories));
		 		}
		 	} ]);
angular.module('welldoneApp').factory('deleteCategory',
	 	[ 'loadAllCategories', function(loadAllCategories) {
	 		return function(deletCategory) {
	 			var oldCategories = loadAllCategories();
	 			var newCategories = [];
	 			angular.forEach(oldCategories, function(category){
	 				if (category.id != deletCategory.id){
	 					newCategories.push(category);
	 				}
	 			});
	 			localStorage.setItem("welldoneCategories", angular.toJson(newCategories));
	 		}
	 	} ]);