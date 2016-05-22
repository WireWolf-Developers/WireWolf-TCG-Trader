
angular.module('mytodoApp').controller('searchExchangeableCardController',
        function ($scope, $http, $state, Backand) {

            var url = 'https://api.deckbrew.com/mtg';
            var self = this;
            $scope.colors = [];
            $scope.cards = [];

            $scope.troca = function (id) {
                $state.go('exchangeCards', {id: id});
            }

            /* 
             Filter cards using the Backand custom query filtraCartasTroca
             SELECT * FROM card WHERE exchangeable=1 AND IdUsers!='{{id}}' AND Colors like '%{{color}}%' AND NAME like '%{{name}}%'
             */
            $scope.searchCards = function () {

                var cor = $scope.color;
                var nome = $scope.name;

                if (cor == undefined) {
                    cor = "";
                }
                if (nome == undefined) {
                    nome = "";
                }

                $http({
                    method: 'GET',
                    url: Backand.getApiUrl() + '/1/query/data/filtraCartasTroca',
                    params: {
                        parameters: {
                            color: cor,
                            id: localStorage.getItem('id'),
                            name: nome
                        }
                    }
                })
                        .success(function (cont) {

                            console.log(cont);
                            $scope.cards = cont;

                        })
                        .error(function (erro) {
                            console.log(erro);
                        });
            }

            /*
             Get all exchangeable cards using the Backand custom query todasCartasTroca
             SELECT * FROM card WHERE exchangeable=1 AND idUsers!='{{id}}'
             */

            $scope.all = function () {

                $http({
                    method: 'GET',
                    url: Backand.getApiUrl() + '/1/query/data/todasCartasTroca',
                    params: {
                        parameters: {
                            id: localStorage.getItem('id')
                        }
                    }
                })
                        .success(function (cont) {
                            $scope.cards = cont;

                        })
                        .error(function (erro) {
                            console.log(erro);
                        });
            }

        
            // return all colors of mana
            $scope.colorsAll = function () {
                $http.get(url + '/colors')
                        .then(function successCallback(response) {
                            $scope.colors = response.data;
                        }, function errorCallback(response) {
                            alert("Errmac");
                        });
            };

     
           
            $scope.colorsAll();
            $scope.all();

        });