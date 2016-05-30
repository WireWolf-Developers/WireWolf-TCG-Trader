
(function () {

    angular.module('tcgTrader')
        .service('cardDetailService', ['$http', 'Backand', 'AuthService', cardDetailService]);

    function cardDetailService($http, Backand, AuthService) {

        var self = this;    
		

	    /* 
            Get Local User
             */
        self.add = function (cardId, name, type, set, colors, img) {
            return $http({
                method: 'POST',
                url: Backand.getApiUrl() + '/1/objects/card',
                data: {
                    card: cardId,
                    idUsers: localStorage.getItem('id'),
                    name: name,
                    type: type,
                    collection: set,
                    colors: colors,
                    urlImage: img

                }
            }).then(function(response) {
                return response.data;
            });
        };		

       
    }
}());
