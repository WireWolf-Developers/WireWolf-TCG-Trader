
angular.module('tcgTrader').controller('cardCollectionController', 

	function($state, $http, $scope, Backand, BackandService) {
		
		var self = this;
		$scope.cards = [];	
		
		

		// Redirect
    	$scope.nexPage = function (id) {
    		$state.go('myCardDetails', {id: id});
    	}

		// Search cards with paramenters
        $scope.getCollection = function() {
        	BackandService.getCollection().then(allCardsSuccess, errorHandler);			
        };
		
		setTimeout(function () {
				  $scope.getCollection();
				}, 1001);
		
		

        $scope.getCardsByFilter = function() {
        	var parameters = [];
        	var pageSize = 50;
        	var pageNumber = 1;
        	var sort = '';

			parameters.push({'fieldName':'idUsers','operator':'in','value': localStorage.getItem('id')});//ID
			if($scope.name !== undefined) {
				parameters.push({'fieldName':'name','operator':'contains','value':$scope.name});// name
			};

			if($scope.color !== undefined) {
				parameters.push({'fieldName': 'colors','operator':'contains','value': $scope.color});
			};
			
			if($scope.type !== undefined) {
				parameters.push({'fieldName': 'type','operator':'equals','value': $scope.type});
			};

			if($scope.collection !== undefined) {
				parameters.push({'fieldName': 'collection','operator':'equals','value': $scope.collection});
			};
			
        	BackandService.getCardsByFilter(pageSize, pageNumber, parameters, sort).then(filteredCardsSuccess, errorHandler);
        };

        /* Success cards */
        function allCardsSuccess(cards){
        	$scope.cards = [];
        	$scope.cards = cards.data;
        	console.log(cards.data.data);
        };
		
		/* Success cards */
        function filteredCardsSuccess(cards){
        	$scope.cards = [];
        	$scope.cards = cards.data.data;
        };
		
		
		 /**
         * Handle promise error call.
         * Error object may have the error message in 'data' property, or in 'data.Message'.
         * @param error
         * @param message
         */
        function errorHandler(error) {
            if (error) {
                if (error.data) {
                    if (error.data.split) {
                        var msg = error.data.split(':');
                        self.error = msg[msg.length - 1];
                    } else if (error.data.Message) {
                        self.error = error.data.Message;
                    }
                } else {
                    self.error = JSON.stringify(error);
                }

            } else {
                self.error = "Unexpected failure";
            }

            alert(self.error);
        }
	}
);
