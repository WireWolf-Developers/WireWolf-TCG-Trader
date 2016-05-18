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
            .controller('cardCollectionController', ['Backand', '$state', '$http', '$scope', cardCollection]);

            function cardCollection(Backand, $state, $http, $scope) {
            	var parameters = [];
            	var self = this;
            	$scope.cards = [];

				// Get all collection
            	$scope.getCollection = function() {
            		$http({
			            method: 'GET',
			            url: Backand.getApiUrl() + '/1/query/data/getColecao',
						  params: {
						    parameters: {
						      //idUser: localStorage.getItem('id')
						      idUser: localStorage.getItem('id')
						    }
						  }})
			                .success(function (cont) {
			                    //console.log(cont.data);
			                    $scope.cards = cont;
			                    //console.log(cont);
			                })
			                .error(function (erro) {
			                    console.log(erro);
			                    alert(erro);
			                });
            	}

            	$scope.nexPage = function (id) {
            		$state.go('myCardDetails', {id: id});
            	}


				// Find by params
				$scope.getCardsByFilter = function() {		
					parameters = [];
					//parameters.push({'fieldName':'idUsers','operator':'in','value': localStorage.getItem('id')});//ID
					parameters.push({'fieldName':'idUsers','operator':'in','value': localStorage.getItem('id')});//ID
					if($scope.name !== undefined) {
						parameters.push({'fieldName':'name','operator':'contains','value':$scope.name});// name
					};

					if($scope.color !== undefined) {
						parameters.push({'fieldName': 'colors','operator':'contains','value': $scope.color});
					};
					
					if($scope.type !== undefined) {
						parameters.push({'fieldName': 'type','operator':'equals','value': $scope.type});
					};

					if($scope.collection !== undefined) {
						parameters.push({'fieldName': 'collection','operator':'equals','value': $scope.collection});
					};

					$http ({
					  method: 'GET',
					  url: Backand.getApiUrl() + '/1/objects/card',
					  params: {
					    pageSize: 100,
					    pageNumber: 1,
					    filter: parameters,
					    sort: ''
					  }
					}).success(function (cont) {
		                    $scope.cards = cont.data;		                    
		                })
		                .error(function (erro) {
		                    console.log(erro);
		                    alert(erro);
		                });

            	}

            };
})();
