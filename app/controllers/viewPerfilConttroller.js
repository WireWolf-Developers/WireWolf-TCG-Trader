'use strict';
(function () {
    
    angular.module('tcgTrader')
            .controller('viewPerfilController', ['Backand', '$state', '$http', '$scope', 'AuthService', 'ProfileService', viewPerfilController]);

    function viewPerfilController(Backand, $state, $http, $scope, AuthService, ProfileService) {
	
	$scope.cartas = 0;
	
	
	$scope.getQtd=function(){
		ProfileService.getQtd().then(getQtdSuccess, errorHandler);
	}
	
	//the service function return an array with one object that contains the property number
	function getQtdSuccess(number){
				$scope.cartas=number[0].qtd;
				 
			}
		
	$scope.edit=function(){
		$state.go('editProfile');
	}
	     

        // Display the image after upload
        $scope.imageUrl = 'img/profile-example.jpg';

             

              
        var self = this;
		
		
		//get user data
            $scope.getProfile = function () {
			
			ProfileService.get().then(getSuccess, errorHandler);
               
            }
			
			function getSuccess(data){
				 $scope.nome = data.firstName;
                 $scope.about = data.description;
                 $scope.trocas = data.exchanges;
				 if(data.photo!=""){
						$scope.imageUrl=data.photo;
					}
					$scope.getQtd();
				 
			}
			
			$scope.getProfile();


			
			
				
				
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
