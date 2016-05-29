'use strict';
(function () {
   
    angular.module('tcgTrader')
            .controller('exchangeController', ['Backand', '$state', '$http', '$scope', 'AuthService', 'exService', exchangeController]);

    function exchangeController(Backand, $state, $http, $scope, AuthService, exService) {

        var url = 'https://api.deckbrew.com/mtg';

        $scope.desiredCardId = $state.params.id;
		$scope.idUserToTrade=0;
		$scope.ownCard="";
		
		console.log("Id da carta: "+$state.params.id);
		
		
		$scope.incrementTrade=function(id){
				 $http({
					method: 'GET',
					url: Backand.getApiUrl() + '/1/query/data/incrementaTroca',
					params:{
						parameters:{
							id:id
						}
					}
			})
                .success(function (cont) {                                 

                })
                .error(function (erro) {
                    console.log(erro);
                });
		}
		
		
		
		$scope.myToThem=function(){
		
		$http({
            method: 'PUT',
            url: Backand.getApiUrl() + '/1/objects/card/'+$scope.ownCard,
			data:{
				idUsers:$scope.idUserToTrade,
				exchangeable:0
					}})
                .success(function (cont) {

					console.log("Carta: "+$scope.ownCard+" para usuário: "+$scope.idUserToTrade);
                   // $('#modalSucess').modal('show');

                })
                .error(function (erro) {
                    console.log(erro);
                });
		
		
		}
		
		$scope.themToMy=function(){
		
		
			$http({
            method: 'PUT',
            url: Backand.getApiUrl() + '/1/objects/card/'+$scope.desiredCardId,
			data:{
				idUsers:localStorage.getItem('id'),
				exchangeable:0
					}})
                .success(function (cont) {

					console.log("Carta: "+$scope.desiredCardId+" para usuário: "+localStorage.getItem('id'));
                   // $('#modalSucess').modal('show');

                })
                .error(function (erro) {
                    console.log(erro);
                });
		
		}
		
		
		$scope.trade=function(){
			if($scope.ownCard==""){
				$("#modalAlerta").modal('show');
			}else{
				$scope.myToThem();
				$scope.themToMy();
				$scope.incrementTrade($scope.idUserToTrade);
				$scope.incrementTrade(localStorage.getItem('id'));
				
				
				$('#modalOk').modal('show');
				
			}
		}

		$scope.getDesired=function(){
		
			 $http({
            method: 'GET',
            url: Backand.getApiUrl() + '/1/objects/card/'+$scope.desiredCardId})
                .success(function (cont) {                                     
					$scope.desiredImg=cont.urlImage;
					$scope.idUserToTrade=cont.idUsers;
					
					console.log($scope.idUserToTrade);
                })
                .error(function (erro) {
                    console.log(erro);
                });
		}

		$scope.getDesired();
       

        $scope.getDetails = function () {
            //   console.log($scope.cardId);
            $http.get(url + '/cards?multiverseid=' + $scope.cardId)
                    .then(function successCallback(response) {
                        var json = JSON.stringify(response);
                        // alert(json);
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

                    }, function errorCallback(response) {
                        alert(JSON.stringify(response));
                    });
        };

		
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
