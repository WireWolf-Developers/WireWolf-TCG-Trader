
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
		
		
		/* 
         Get all types from DeckBrew API
          */
        self.typesAll = function () {
            return  $http.get(url + '/types').then(function(response) {
                return response;
            });
        };
		
		/* 
         Get all sets from DeckBrew API
          */
        self.setsAll = function () {
            return  $http.get(url + '/sets').then(function(response) {
                return response;
            });
        };
		
       
    }
}());
