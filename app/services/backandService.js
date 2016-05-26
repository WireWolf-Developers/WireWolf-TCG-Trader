(function () {

    angular.module('tcgTrader')
        .service('BackandService', ['$http', 'Backand', 'AuthService', BackandService]);

    function BackandService($http, Backand, AuthService) {//$state, $http, $scope, Backand, 

        var self = this;   

        /*
		Get my collection
		*/
		self.getCollection = function () {
			return $http ({
				  method: 'GET',
				  url: Backand.getApiUrl() + '/1/query/data/getColecao',
				  params: {
				    parameters: {
				      idUser: localStorage.getItem('id')
				    }
				  }
				});

        };

        /*
		Get my collection with params
		*/
		self.getCardsByFilter = function (pageSize, pageNumber, parameters, sort) {
			return $http ({
					  method: 'GET',
					  url: Backand.getApiUrl() + '/1/objects/card',
					  params: {
					    pageSize: pageSize,
					    pageNumber: pageNumber,
					    filter: parameters,
					    sort: sort
					  }
					});

        };

        /*
		Add to collection
        */
        self.add = function (name, type, set, colors, img) {
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
            });
        };
    }
}());
