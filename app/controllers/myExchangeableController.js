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
            .controller('myExchangeableController', ['Backand', '$state', '$scope', '$http', 'AuthService', myExchangeableController]);

    function myExchangeableController(Backand, $state, $scope, $http, AuthService) {
        var self = this;
        $scope.cards = [];
        
        
            $scope.removeTrade = function(card) {
                       console.log(card.id);
               $http ({
                method: 'PUT',
                url: Backand.getApiUrl() + '/1/objects/card/'+card.id,
                data: {
                  exchangeable: 0
                }
              })
               .success(function () {
                //   console.log("Alterado");
                    var indice=$scope.cards.indexOf(card);
                    $scope.cards.splice(indice,1);
                //$('#modalSucess').modal('show');
                })
                .error(function (erro) {
                    console.log(erro);
                });
              
           
        };
        
        
        
        
        $http({
            method: 'GET',
            url: Backand.getApiUrl() + '/1/query/data/cardsExchangeables',
            params: {
                parameters: {
                    idUser: localStorage.getItem('id')
                }
            }
        })
                .success(function (cont) {
                    $scope.cards = cont;
                   // console.log($scope.cards);
                })
                .error(function (erro) {
                    console.log(erro);
                });
                $scope.myCardDetails = function(id) {
                    $state.go('myCardDetails', {id: id});
                  };
                  
                  

    }
    ;



})();
