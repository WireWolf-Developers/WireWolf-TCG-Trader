'use strict';
(function () {
    /**
     * @ngdoc function
     * @name todoApp.controller:HeaderCtrl
     * @description
     * # HeaderCtrl
     * Header controller of the todoApp, identifying the current user
     */
    angular.module('tcgTrader')
            .controller('cardDetailsController', ['Backand', '$state', '$http', '$scope', 'AuthService', cardDetailsController]);

    function cardDetailsController(Backand, $state, $http, $scope, AuthService) {

        var url = 'https://api.deckbrew.com/mtg';

        $scope.cardId = $state.params.multiverseid;



        $scope.add = function () {
            //alert(localStorage.getItem('id'));
            //  console.log($scope.details);
            $http({
                method: 'POST',
                url: Backand.getApiUrl() + '/1/objects/card',
                data: {
                    card: $scope.cardId,
                    idUsers: localStorage.getItem('id'),
                    name: $scope.name,
                    type: $scope.type,
                    collection: $scope.set,
                    colors: $scope.colors,
                    urlImage: $scope.img

                }
            })
                    .success(function (cont) {
                        console.log("salvou");
                        $('#modalSucess').modal('show');
                        //   $scope.users = cont.data;
                    })
                    .error(function (erro) {
                        console.log(erro);
                    });
        };

        $scope.getDetails = function () {
            //   console.log($scope.cardId);
            $http.get(url + '/cards?multiverseid=' + $scope.cardId)
                    .then(function successCallback(response) {
                        var json = JSON.stringify(response);
                        // alert(json);
                        $scope.details = response.data[0];
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

        $scope.getDetails();


        $scope.redirect = function () {
            $state.go('searchCards');
        }

    }



})();
