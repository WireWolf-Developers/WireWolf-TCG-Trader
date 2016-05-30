
(function () {

    angular.module('tcgTrader')
        .service('myCardDetailService', ['$http', 'Backand', 'AuthService', myCardDetailService]);

    function myCardDetailService($http, Backand, AuthService) {

        var self = this;    
		

	    /* 
            Get card backand database
             */
        self.get = function (id) {
            return $http({
                method: 'GET',
                url: Backand.getApiUrl() + '/1/objects/card/' + id,
               
            }).then(function(response) {
                return response.data;
            });
        };		
		
		//add card to trade
		
		self.addTrade = function (id) {
            return $http({
                method: 'PUT',
                url: Backand.getApiUrl() + '/1/objects/card/' + id,
                data: {
                    exchangeable: 1
                }
            }).then(function(response) {
                return response.data;
            });
        };	

		//remove from trade
		self.removeTrade = function (id) {
            return $http({
                method: 'PUT',
                url: Backand.getApiUrl() + '/1/objects/card/' + id,
                data: {
                    exchangeable: 0
                }
            }).then(function(response) {
                return response.data;
            });
        };		

		//remove from collection
	self.removeCollection = function (id) {
            return $http({
                method: 'DELETE',
                url: Backand.getApiUrl() + '/1/objects/card/' + id
            }).then(function(response) {
                return response.data;
            });
        };				

       
    }
}());
