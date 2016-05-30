'use strict';
(function () {
    /**
     * @ngdoc function
     * @name todoApp.controller:HeaderCtrl
     * @description
     * # HeaderCtrl
     * Header controller of the todoApp, identifying the current user
     */
    angular.module('tcgTrader')
            .controller('myCardDetailsController', ['Backand', '$state', '$http', '$scope', 'AuthService', 'DeckBrewService', 'myCardDetailService', myCardDetailsController]);

    function myCardDetailsController(Backand, $state, $http, $scope, AuthService, DeckBrewService, myCardDetailService) {

       
        $scope.message = "";
        $scope.id = $state.params.id;
        $scope.show=0;
        // console.log($scope.id);

        $scope.removeTrade = function () {
		
			myCardDetailService.removeTrade($scope.id).then(removeTradeSuccess, errorHandler);  
        };
		
		
		function removeTradeSuccess(){
			 $scope.message = "Card removed from echangeable area";
             $scope.url = "cardsToExchange";
             $('#modalSucess').modal('show');		
		}
		
        $scope.addTrade = function () {
		
			myCardDetailService.addTrade($scope.id).then(addTradeSuccess, errorHandler);           

        };
		
		function addTradeSuccess(){
			 $scope.url = "cardCollection";
             $scope.message = "Card add to Trade";
             $('#modalSucess').modal('show');
		}
        
         $scope.removeCollection = function () {
		 
			myCardDetailService.removeCollection($scope.id).then(removeSuccess, errorHandler); 
        };
		
		function removeSuccess(){
			$scope.message = "Card removed from collection";
            $scope.url = "cardCollection";
            $('#modalSucess').modal('show');
		}
        
        
        
        $scope.redirect = function (url) {
            $state.go(url);
        };

        //GetDetails na API
        $scope.getDetails = function (id) {		
			DeckBrewService.getDetails(id).then(getDetailsSuccess, errorHandler);			
        };
		
		 function getDetailsSuccess(response){
		
						$scope.details = response.data[0];
                        $scope.name = $scope.details.name;
                        $scope.type = $scope.details.types.join('-');
                        $scope.description = $scope.details.text;
                        $scope.rarity = $scope.details.editions[0].rarity;
                        $scope.number = $scope.details.editions[0].number;
                        $scope.set = $scope.details.editions[0].set;
                        $scope.power = $scope.details.power + "/" + $scope.details.toughness;
                        $scope.img = $scope.details.editions[0].image_url;
                        $scope.colors = $scope.details.colors.join('-');       
      };

	  
	  
		//get card on backand by id		
				$scope.get=function(id){
					myCardDetailService.get(id).then(getSuccess, errorHandler);
					
				}
				
				function getSuccess(cont){
					 $scope.mycard = cont;
                  console.log($scope.mycard.exchangeable);
                    if($scope.mycard.exchangeable===1){
                        $scope.show=1;
                    }else{
                        $scope.show=0;
                    }
            
            
                    $scope.getDetails($scope.mycard.card);
				}
				
				$scope.get($scope.id);
				



				
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



})();
