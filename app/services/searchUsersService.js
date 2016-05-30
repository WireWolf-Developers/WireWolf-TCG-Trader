
(function () {

    angular.module('tcgTrader')
            .service('SearchUsersService', ['$http', 'Backand', 'AuthService', SearchUsersService]);

    function SearchUsersService($http, Backand, AuthService) {

        var self = this;

        /* Get all users */
        self.getUsers = function () {
            return $http({
                method: 'GET',
                url: Backand.getApiUrl() + '/1/objects/users'})
            .then(function (response) {
                return response.data.data;
            });
        };

    }
}());
