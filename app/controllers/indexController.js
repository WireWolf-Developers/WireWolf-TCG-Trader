'use strict';
(function () {
    /**
     * @ngdoc function
     * @name todoApp.controller:LoginCtrl
     * @description
     * # LoginCtrl
     * Backand login control - need to implement in order to get the token for authentication
     */

    angular.module('tcgTrader').controller('indexController', ['$state', '$scope', IndexCtrl]);

    function IndexCtrl($state, $scope) {
        $scope.loginPage = function() {
            $state.go('login');    
        }

        $scope.createPage = function() {
            $state.go('newUser');    
        }
    }

})();