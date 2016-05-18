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
            .controller('myCardDetailsController', ['Backand', '$state', '$http', '$scope', 'AuthService', myCardDetailsController]);

    function myCardDetailsController(Backand, $state, $http, $scope, AuthService) {

        var url = 'https://api.deckbrew.com/mtg';
        $scope.message = "";
        $scope.id = $state.params.id;
        $scope.show=0;
        // console.log($scope.id);

        $scope.removeTrade = function () {
            $http({
                method: 'PUT',
                url: Backand.getApiUrl() + '/1/objects/card/' + $scope.id,
                data: {
                    exchangeable: 0
                }
            })
                    .success(function () {
                        //   console.log("Alterado");
                        $scope.message = "Card removed from echangeable area";
                        $scope.url = "cardsToExchange";
                        $('#modalSucess').modal('show');
                    })
                    .error(function (erro) {
                        console.log(erro);
                    });
            ;

        };
        $scope.addTrade = function () {
            $http({
                method: 'PUT',
                url: Backand.getApiUrl() + '/1/objects/card/' + $scope.id,
                data: {
                    exchangeable: 1
                }
            })
                    .success(function () {
                        // console.log("Alterado");
                        $scope.url = "cardCollection";
                        $scope.message = "Card add to Trade";
                        $('#modalSucess').modal('show');
                    })
                    .error(function (erro) {
                        console.log(erro);
                    });
            ;

        };
        
         $scope.removeCollection = function () {
            $http({
                method: 'DELETE',
                url: Backand.getApiUrl() + '/1/objects/card/' + $scope.id
            })
                    .success(function () {
                        //   console.log("Alterado");
                        $scope.message = "Card removed from collection";
                        $scope.url = "cardCollection";
                        $('#modalSucess').modal('show');
                    })
                    .error(function (erro) {
                        console.log(erro);
                    });
            ;

        };
        
        
        
        $scope.redirect = function (url) {
            $state.go(url);
        };

        //GetDetails na API
        $scope.getDetails = function (id) {
            $http.get(url + '/cards?multiverseid=' + id)
                    .then(function successCallback(response) {
                        var json = JSON.stringify(response);
                        // alert(json);
                        $scope.details = response.data[0];
                        //  console.log( $scope.details);
                        $scope.name = $scope.details.name;
                        $scope.type = $scope.details.types.join('-');
                        $scope.description = $scope.details.text;
                        $scope.rarity = $scope.details.editions[0].rarity;
                        $scope.number = $scope.details.editions[0].number;
                        $scope.set = $scope.details.editions[0].set;
                        $scope.power = $scope.details.power + "/" + $scope.details.toughness;
                        $scope.img = $scope.details.editions[0].image_url;
                        $scope.colors = $scope.details.colors.join('-');

                    }, function errorCallback(response) {
                        alert(JSON.stringify(response));
                    });
        };

        //busca a carta no bd pelo id
        return $http({
            method: 'GET',
            url: Backand.getApiUrl() + '/1/objects/card/' + $scope.id
        })
                .success(function (cont) {
                    $scope.mycard = cont;
                  console.log($scope.mycard.exchangeable);
                    if($scope.mycard.exchangeable===1){
                        $scope.show=1;
                    }else{
                        $scope.show=0;
                    }
            
            
                    $scope.getDetails($scope.mycard.card);
                })
                .error(function (erro) {
                    console.log(erro);
                });





    }



})();
