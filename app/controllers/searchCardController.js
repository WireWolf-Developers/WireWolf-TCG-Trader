
angular.module('tcgTrader').controller('searchCardController', 

  function($scope, $http, $state, DeckBrewService) {
         
      var url = 'https://api.deckbrew.com/mtg';
      var self = this;
      $scope.colors = [];
      $scope.cards = [];
      $scope.sets = [];
      $scope.types = [];

      // Search cards with paramenters
      $scope.searchCards = function(){
        DeckBrewService.getCardsByFilter($scope.set, $scope.color, $scope.rarity, $scope.type, $scope.name, $scope.format)
        .then(allCardsSuccess, errorHandler);
      };

      // Return all cards (the first 100)
      $scope.getAllCards = function() {
        DeckBrewService.getAllCards().then(allCardsSuccess, errorHandler);
      };

      // return all sets of card
      $scope.setsAll = function(){
         DeckBrewService.setsAll().then(setsSuccess, errorHandler);
      };
	
		  function setsSuccess(sets){
				$scope.sets = sets.data;
			};
     
      // return all colors of mana
      $scope.colorsAll = function () {
          DeckBrewService.colorsAll().then(colorSuccess, errorHandler);
      };

      // Add card to my collection
      /*$scope.addToColletion = function() {
        BackandService.add().then(addedToCollection, errorHandler);
      };*/

      function addedToCollection() {
        $state.go('collection');
      };

  		function colorSuccess(colors){
  			$scope.colors = colors.data;
  		};
  		
      // Get all types of cards
      $scope.typesAll = function(){
        DeckBrewService.typesAll().then(typesSuccess, errorHandler);
      };

  	  function typesSuccess(types){
  			$scope.types = types.data;
  		};		

      $scope.cardDetails = function(id) {
        $state.go('cardDetails', {multiverseid: id});
      };

      /* Success all cards */
      function allCardsSuccess(cards){
        $scope.cards = cards.data;
      };
    /**
     * Handle promise error call.
     * Error object may have the error message in 'data' property, or in 'data.Message'.
     * @param error
     * @param message
     */
    function errorHandler(error) {
        if (error) {
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
});