
(function () {

    angular.module('tcgTrader')
        .service('DeckBrewService', ['$http', 'Backand', 'AuthService', DeckBrewService]);

    function DeckBrewService($http, Backand, AuthService) {

        var self = this;   
		var url = 'https://api.deckbrew.com/mtg';		

	    /* 
             Get all colors from DeckBrew API
             */
        self.colorsAll = function () {
            return $http.get(url + '/colors').then(function(response) {
                return response;
            });
        };
		
       
    }
}());
