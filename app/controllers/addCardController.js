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
            .controller('addCardController', ['Backand', '$state', '$scope', '$http', 'AuthService', addCardController]);

    function addCardController(Backand, $state, $scope, $http, AuthService) {
        var self = this;
        $scope.card = {
            card: 'teste',
            exchangeable: 1,
            exchanged: 1,
            idUsers: 1,
            name: 'About',
            type: 'normal',
            collection: 'normal',
            colors: 'red'
        };

        $scope.addCard = function () {
            $http.post(Backand.getApiUrl() + '/1/objects/card', $scope.card)
                    .success(function () {
                        console.log('Card Adicionado com Sucesso');
                    })
                    .error(function () {
                        console.log('erro ao cadastrar');
                    });



//             $http({
//            method: 'POST',
//            url: Backand.getApiUrl() + '/1/objects/card',
//            data:{
//                card: 'teste',
//                exchangeable: 1,
//                exchanged: 1,
//                idUsers: 1,
//                name: 'About',
//                type: 'normal',
//                collection: 'normal',
//                colors: 'red'
//                 
//            }
//        })
//                .success(function (cont) {
//                     console.log("salvou");
//                 //   $scope.users = cont.data;
//                })
//                .error(function (erro) {
//                    console.log(erro);
//                });
        };

    }

})();
