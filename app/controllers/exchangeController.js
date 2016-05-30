'use strict';
(function () {
   
    angular.module('tcgTrader')
            .controller('exchangeController', ['Backand', '$state', '$http', '$scope', 'AuthService', 'exService', exchangeController]);

    function exchangeController(Backand, $state, $http, $scope, AuthService, exService) {

        var url = 'https://api.deckbrew.com/mtg';

        $scope.desiredCardId = $state.params.id;
		$scope.idUserToTrade=0;
		$scope.ownCard="";	
			
				
		
		
		$scope.myToThem=function(){
		
			exService.trade($scope.ownCard, $scope.idUserToTrade).then(tradeSuccess, errorHandler);			
		}
		
		function tradeSuccess(res) {			
			console.log("Carta: "+$scope.ownCard+" para usuário: "+$scope.idUserToTrade);			
        }
		
		
		$scope.themToMy=function(){		
			exService.trade($scope.desiredCardId, localStorage.getItem('id')).then(tradeSuccess, errorHandler);			
		}
		
		
		$scope.trade=function(){
			if($scope.ownCard==""){
				$("#modalAlerta").modal('show');
			}else{
				$scope.myToThem();
				$scope.themToMy();
				exService.incrementTrade($scope.idUserToTrade);
				exService.incrementTrade(localStorage.getItem('id'));				
				
				$('#modalOk').modal('show');
				
			}
		}

		
		//get desired card data
		$scope.getDesired=function(){
		
		exService.getDesired($scope.desiredCardId).then(desiredSuccess, errorHandler);			
		}
		
		function desiredSuccess(card) {			
			$scope.desiredImg=card.urlImage;
            $scope.idUserToTrade=card.idUsers;				
        }

		$scope.getDesired();
               
		
		//Get user exchangeable cards
       $scope.myEx=function(){  	  
				exService.myEx().then(myExSuccess, errorHandler);				
	   }
	   
	   function myExSuccess(cards) {			
			$scope.cards = [];
            $scope.cards=cards;		
        }
	   
	   $scope.myEx();
	   
	   $scope.choose=function(id, img){
			$scope.ownCard=id;
			$scope.selectedImg=img;
			$("#selectOne").addClass('transparent');			
	   }


        $scope.redirect = function () {
		
			$('#modalOk').modal('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
            $state.go('cardCollection');
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
