
(function () {

    angular.module('tcgTrader')
            .service('MyExchangeableService', ['$http', 'Backand', 'AuthService', MyExchangeableService]);

    function MyExchangeableService($http, Backand, AuthService) {

        var self = this;

        /*
         Get all exchangeable cards using the Backand custom query todasCartasTroca
         SELECT * FROM card WHERE exchangeable=1 AND idUsers!='{{id}}'
         */
        self.getMyExchangeable = function () {
            return $http({
                method: 'GET',
                url: Backand.getApiUrl() + '/1/query/data/cardsExchangeables',
                params: {
                    parameters: {
                        idUser: localStorage.getItem('id')
                    }
                }
            }).then(function (response) {
                //console.log(response);
                return response.data;
            });
        };
        
         self.removeTrade = function (card) {
            return $http({
                 method: 'PUT',
                    url: Backand.getApiUrl() + '/1/objects/card/' + card.id,
                    data: {
                        exchangeable: 0
                    }
            }).then(function () {
               // console.log("service removed");
                return card;
            });
        };


    }
}());
