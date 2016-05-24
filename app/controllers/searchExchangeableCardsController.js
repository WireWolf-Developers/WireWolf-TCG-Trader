
angular.module('tcgTrader').controller('searchExchangeableCardController',
        function ($scope, $http, $state, Backand, SearchExService, DeckBrewService) {

            var url = 'https://api.deckbrew.com/mtg';
            var self = this;
            $scope.colors = [];
            $scope.cards = [];

            $scope.troca = function (id) {
                $state.go('exchangeCards', {id: id});
            }

           //filter cards
            $scope.searchCards = function () {

                var cor = $scope.color;
                var nome = $scope.name;

                if (cor == undefined) {
                    cor = "";
                }
                if (nome == undefined) {
                    nome = "";
                }

               SearchExService.search(cor, nome).then(onSearchSuccess, errorHandler);
            }

           
			//get all cards
            $scope.all = function () {
			
			SearchExService.all().then(onSearchSuccess, errorHandler);
               
            }

        
            // return all colors of mana
            $scope.colorsAll = function () {
                DeckBrewService.colorsAll().then(colorSuccess, errorHandler);
            };
			
			function colorSuccess(colors){
				$scope.colors=colors.data;
			}

			
			  /**
         * Success promise call with the list
         * @param data
         */
        function onSearchSuccess(cards) {
            $scope.cards=cards;
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
     
           
            $scope.colorsAll();
            $scope.all();

        });