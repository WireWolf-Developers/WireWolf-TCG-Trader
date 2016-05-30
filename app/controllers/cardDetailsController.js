'use strict';
(function () {
   
    angular.module('tcgTrader')
            .controller('cardDetailsController', ['Backand', '$state', '$http', '$scope', 'AuthService', 'DeckBrewService', 'cardDetailService', cardDetailsController]);

    function cardDetailsController(Backand, $state, $http, $scope, AuthService, DeckBrewService, cardDetailService) {
      

        $scope.cardId = $state.params.multiverseid;



        $scope.add = function () {
           cardDetailService.add($scope.cardId, $scope.name, $scope.type, $scope.set, $scope.colors, $scope.img).then(addSuccess, errorHandler);
			
        };
		
		function addSuccess(response){
			 $('#modalSucess').modal('show');
		}

        $scope.getDetails = function () {		
			DeckBrewService.getDetails($scope.cardId).then(getDetailsSuccess, errorHandler);			
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

        $scope.getDetails();


        $scope.redirect = function () {
		
			$('#modalSucess').modal('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();			
            $state.go('searchCards');
        }
		
		
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
