
(function () {

    angular.module('tcgTrader')
        .service('SearchExService', ['$http', 'Backand', 'AuthService', SearchExService]);

    function SearchExService($http, Backand, AuthService) {

        var self = this;      

	    /* 
             Filter cards using the Backand custom query filtraCartasTroca
             SELECT * FROM card WHERE exchangeable=1 AND IdUsers!='{{id}}' AND Colors like '%{{color}}%' AND NAME like '%{{name}}%'
			 @param cor
			 @param nome
             */
        self.search = function (cor, nome) {
            return $http({
                    method: 'GET',
                    url: Backand.getApiUrl() + '/1/query/data/filtraCartasTroca',
                    params: {
                        parameters: {
                            color: cor,
                            id: localStorage.getItem('id'),
                            name: nome
                        }
                    }
                }).then(function(response) {
                return response.data;
            });
        };
		
		
		 /*
             Get all exchangeable cards using the Backand custom query todasCartasTroca
             SELECT * FROM card WHERE exchangeable=1 AND idUsers!='{{id}}'
             */
		self.all = function () {
            return $http({
                    method: 'GET',
                    url: Backand.getApiUrl() + '/1/query/data/todasCartasTroca',
                    params: {
                        parameters: {
                            id: localStorage.getItem('id')
                        }
                    }
                }).then(function(response) {
                return response.data;
            });
        };

       
    }
}());
