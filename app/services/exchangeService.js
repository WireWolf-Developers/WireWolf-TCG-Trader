
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

       
    }
}());
