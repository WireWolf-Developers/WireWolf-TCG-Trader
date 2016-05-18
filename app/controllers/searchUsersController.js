'use strict';
(function () {
    /**
     * @ngdoc function
     * @name todoApp.controller:HeaderCtrl
     * @description
     * # HeaderCtrl
     * Header controller of the todoApp, identifying the current user
     */
    angular.module('mytodoApp')
            .controller('searchUsersController', ['Backand', '$state','$scope', '$http', 'AuthService', searchUsersController]);

    function searchUsersController(Backand, $state,$scope, $http, AuthService) {
        var self = this;
       //    $scope.filtro='';
            $scope.users = [];

        // self.id = AuthService.currentUser.id;

        //console.log( localStorage.getItem('id'));
        //console.log(Backand.getApiUrl());

        $http({
            method: 'GET',
            url: Backand.getApiUrl() + '/1/objects/users'})
                .success(function (cont) {
                   // console.log(cont.data);
            $scope.users=cont.data;
                })
                .error(function (erro) {
                    console.log(erro);
                });
    }

})();
