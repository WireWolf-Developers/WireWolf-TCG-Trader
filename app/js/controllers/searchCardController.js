var myApp = angular.module('myApp',[]);
var url = 'https://api.deckbrew.com/mtg';

myApp.controller('MyController', function($scope, $http) {

  // Search for cards
  $scope.searchCards = function(){
    $http.get(url + '/cards?set=UNH&color=red&color=blue&rarity=rare')
      .then(function successCallback(response) {
        console.log(response);
        var json = JSON.stringify(response) 
        alert(json);
      }, function errorCallback(response) {
        cardNotFound(response);
      });
  };

// Return a single card
  $scope.cardDetail = function(id) {
    $http.get(url + '/mtg/cards?multiverseid=' + id)
      .then(function successCallback(response) {
        console.log(response);
        var json = JSON.stringify(response);
        $scope.name = json.name;// string
        $scope.type = json.type;// array
        $scope.colors = json.collers;// array
        $scope.description = json.text;// string
        $scope.costs = json.costs;// array
        $scope.number = json.editions.number;//number
        $scope.collection = json.editions.set;// string
        $scope.rarity = json.editions.rarity;// string
        $scope.power = json.power;//string. Can be null
        $scope.toughness = json.toughness; //string. Can be null
        alert(json);
      }, function errorCallback(response) {
        cardNotFound(response);
      });
  };

// return all sets
  $scope.setsAll = function(){
    $http.get(url + '/mtg/sets')
      .then(function successCallback(response) {
        console.log(response);
        var json = JSON.stringify(response);
      }, function errorCallback(response) {
        alert("Errmac");
      });
  };

  cardNotFound = function(response) {
    // data: "404 page not found↵", status: 404, config: Object, statusText: ""
    alerlt(response.data + "\nStatus: " + response.status)
  };

  $scope.greetMe = 'Hola!';
});