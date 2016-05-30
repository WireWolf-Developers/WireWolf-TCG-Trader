'use strict';
//(function () {
/**
 * @ngdoc function
 * @name todoApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Header controller of the todoApp, identifying the current user
 */

angular.module('tcgTrader').controller('myExchangeableController',
        function ($scope, $http, $state, Backand, MyExchangeableService, DeckBrewService) {

            var self = this;
            $scope.cards = [];

            $scope.removeTrade = function (card) {
                MyExchangeableService.removeTrade(card).then(onSuccessRemove, errorHandler);
            };

            function onSuccessRemove(card) {
                var indice = $scope.cards.indexOf(card);
                $scope.cards.splice(indice, 1);
                $('#modalSucess').modal('show');
            }

            $scope.myCardDetails = function (id) {
                $state.go('myCardDetails', {id: id});
            };

            //get all my cards to exchange
            $scope.allmy = function () {

                MyExchangeableService.getMyExchangeable().then(onSuccess, errorHandler);

            };
            function onSuccess(cards) {
                $scope.cards = cards;

            }
            function errorHandler(error) {
                if (error) {
                    console.log(error);
                    if (error.data) {
                        if (error.data.split) {
                            var msg = error.data.split(':');
                            self.error = msg[msg.length - 1];
                        } else if (error.data.Message) {
                            self.error = error.data.Message;
                        }
                    } else {
                        self.error = JSON.stringify(error);
                    }

                } else {
                    self.error = "Unexpected failure";
                }

                alert(self.error);
            }

            //initialize cards
            $scope.allmy();
        });