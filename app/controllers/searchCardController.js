
angular.module('tcgTrader').controller('searchCardController', 

  function($scope, $http, $state, DeckBrewService) {
           
        var url = 'https://api.deckbrew.com/mtg';
        var self = this;
        $scope.colors = [];
        $scope.cards = [];
        $scope.sets = [];
        $scope.types = [];

        // Search cards with paramenters
        $scope.searchCards = function(){
          $http.get(url + '/cards',
            {params:{"set": $scope.set, "color": $scope.color, "rarity": $scope.rarity, "type": $scope.type, "name":$scope.name}})
            .then(function successCallback(response) {
              var json = JSON.stringify(response) 
             // alert(json);
              // item-collection-thumbnail" ng-src="http://gatherer.wizards.com/Handlers/Image.ashx?type=card&multiverseid={{user.editions[0].multiverse_id}}
              $scope.cards = response.data;
			       //console.log($scope.cards);
            }, function errorCallback(response) {
              alert(JSON.stringify(response));
            });
        };

        // Return all cards (the first 100)
        $scope.getAllCards = function() {
          $http.get(url + '/cards?page=1')
            .then(function successCallback(response) {
              var json = JSON.stringify(response) 
             // alert(json);
              $scope.cards = response.data;
			         //console.log($scope.cards[0].editions[0].image_url);
            }, function errorCallback(response) {
              alert(JSON.stringify(response));
            });
        };

        // return all sets of card
        $scope.setsAll = function(){
           DeckBrewService.setsAll().then(setsSuccess, errorHandler);
        };
		
		function setsSuccess(sets){
				$scope.sets=sets.data;
			}

       
       // return all colors of mana
            $scope.colorsAll = function () {
                DeckBrewService.colorsAll().then(colorSuccess, errorHandler);
            };

			function colorSuccess(colors){
				$scope.colors=colors.data;
			}
			
			
        // Get all types of cards
        $scope.typesAll = function(){
          DeckBrewService.typesAll().then(typesSuccess, errorHandler);
        };
		
		function typesSuccess(types){
				$scope.types=types.data;
			}
		

        $scope.cardDetails = function(id) {
          $state.go('cardDetails', {multiverseid: id});
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
		
		

        });