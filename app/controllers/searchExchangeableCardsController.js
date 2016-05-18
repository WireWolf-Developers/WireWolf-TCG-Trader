
angular.module('mytodoApp').controller('searchExchangeableCardController', 

  function($scope, $http, $state, Backand) {
           
        var url = 'https://api.deckbrew.com/mtg';
        var self = this;
        $scope.colors = [];
        $scope.cards = [];
        $scope.sets = [];
        $scope.types = [];

        
		$scope.troca=function(id){
			$state.go('exchangeCards', {id: id});
		}
		
		$scope.searchCards=function(){
		//var filtro="Colors like '%%' AND Name like '%%'";
		
		var cor=$scope.color;
		var nome=$scope.name;
		
		if(cor==undefined){
			cor="";
		}
		if(nome==undefined){
			nome="";
		}
		
		console.log("Cor: "+cor);
		console.log("Nome: "+nome);
		
		 $http({
            method: 'GET',
            url: Backand.getApiUrl() + "/1/query/data/filtraCartasTroca?parameters=%7B%22id%22:%22"+localStorage.getItem('id')+"%22,%22name%22:%22"+nome+"%22,%22color%22:%22"+cor+"%22%7D"})
                .success(function (cont) {
				
				console.log(cont);
                    $scope.cards=cont;                   

                })
                .error(function (erro) {
                    console.log(erro);
                });
		
		
		}
		
		$scope.all=function(){		
		
		  $http({
            method: 'GET',
            url: Backand.getApiUrl() + '/1/query/data/todasCartasTroca?parameters=%7B%22id%22:%22'+localStorage.getItem('id')+'%22%7D'})
                .success(function (cont) {
                    $scope.cards=cont;                   

                })
                .error(function (erro) {
                    console.log(erro);
                });
		
		
		}

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
		
		$scope.colorsAll();
		$scope.all();
		
        });