
(function () {

    angular.module('tcgTrader')
        .service('exService', ['$http', 'Backand', 'AuthService', exService]);

    function exService($http, Backand, AuthService) {

        var self = this;      

	  		
		
		 /*
             Get all user exchangeable cards using the Backand custom query cardsExchangeables
             select * from card where idUsers ='{{idUser}}' and exchangeable =1
             */
		self.myEx = function () {
            return $http({
                    method: 'GET',
                    url: Backand.getApiUrl() + '/1/query/data/cardsExchangeables',
                    params: {
                        parameters: {
                            idUser: localStorage.getItem('id')
                        }
                    }
                }).then(function(response) {				
                return response.data;
            });
        };
		
		//get the desired card data
		self.getDesired = function (cardId) {
            return $http({
                    method: 'GET',
                    url: Backand.getApiUrl() + '/1/objects/card/'+cardId                   
                }).then(function(response) {				
                return response.data;
            });
        };
		
		
		// trade cards
		self.trade = function (ownCard, idUserToTrade) {
            return $http({
				method: 'PUT',
				url: Backand.getApiUrl() + '/1/objects/card/'+ownCard,
				data:{
					idUsers:idUserToTrade,
					exchangeable:0
						}}).then(function(response) {				
                return response.data;
            });
        };
		
		// increment user number of trades
		self.incrementTrade = function (id) {
            return 	 $http({
					method: 'GET',
					url: Backand.getApiUrl() + '/1/query/data/incrementaTroca',
					params:{
						parameters:{
							id:id
						}
					}
			}).then(function(response) {				
                return response.data;
            });
        };
		
				

       
    }
}());
