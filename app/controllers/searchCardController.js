
angular.module('tcgTrader').controller('searchCardController', 

  function($scope, $http, $state) {
           
        var url = 'https://api.deckbrew.com/mtg';
        var self = this;
        $scope.colors = [];
        $scope.cards = [];
        $scope.sets = [];
        $scope.types = [];

        // Search cards with paramenters
        $scope.searchCards = function(){
          $http.get(url + '/cards',
            {params:{"set": $scope.set, "color": $scope.color, "rarity": $scope.rarity, "type": $scope.type, "name":$scope.name}})
            .then(function successCallback(response) {
              var json = JSON.stringify(response) 
             // alert(json);
              // item-collection-thumbnail" ng-src="http://gatherer.wizards.com/Handlers/Image.ashx?type=card&multiverseid={{user.editions[0].multiverse_id}}
              $scope.cards = response.data;
			       //console.log($scope.cards);
            }, function errorCallback(response) {
              alert(JSON.stringify(response));
            });
        };

        // Return all cards (the first 100)
        $scope.getAllCards = function() {
          $http.get(url + '/cards?page=1')
            .then(function successCallback(response) {
              var json = JSON.stringify(response) 
             // alert(json);
              $scope.cards = response.data;
			         //console.log($scope.cards[0].editions[0].image_url);
            }, function errorCallback(response) {
              alert(JSON.stringify(response));
            });
        };

        // return all sets of card
        $scope.setsAll = function(){
          $http.get(url + '/sets')
            .then(function successCallback(response) {
              $scope.sets = response.data;
            }, function errorCallback(response) {
              alert("Errmac");
            });
        };

        // return all colors of mana
        $scope.colorsAll = function(){
          $http.get(url + '/colors')
            .then(function successCallback(response) {
              $scope.colors = response.data;
            }, function errorCallback(response) {
              alert("Errmac");
            });
        };

        // Get all types of cards
        $scope.typesAll = function(){
          $http.get(url + '/types')
            .then(function successCallback(response) {
              $scope.types = response.data;
            }, function errorCallback(response) {
              alert("Errmac");
            });
        };

        $scope.cardDetails = function(id) {
          $state.go('cardDetails', {multiverseid: id});
        };

        });