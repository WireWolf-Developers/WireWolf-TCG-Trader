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
            .controller('viewPerfilController', ['Backand', '$state', '$http', '$scope', 'AuthService', viewPerfilController]);

    function viewPerfilController(Backand, $state, $http, $scope, AuthService) {
	
	$scope.cartas = 0;
	
	
	$scope.getQtd=function(){
	
			 $http({
            method: 'GET',
            url: Backand.getApiUrl() + '/1/query/data/getQtdCards?parameters=%7B%22id%22:%22'+localStorage.getItem('id')+'%22%7D'})
                .success(function (cont) { 

					
					$scope.cartas=cont[0].qtd;
                })
                .error(function (erro) {
                    console.log(erro);
                });
	
	}
		
	$scope.edit=function(){
		$state.go('editProfile');
	}
	     

        // Display the image after upload
        $scope.imageUrl = '../img/profile-example.jpg';

             

              
        var self = this;

        // self.id = AuthService.currentUser.id;



        //console.log( localStorage.getItem('id'));
        //console.log(Backand.getApiUrl());

        $http({
            method: 'GET',
            url: Backand.getApiUrl() + '/1/objects/users/'+localStorage.getItem('id')})
                .success(function (cont) {

                    console.log(cont);

                    $scope.nome = cont.firstName;
                    $scope.about = cont.description;
                    $scope.trocas = cont.exchanges;
                    
					
					$scope.getQtd();
					
					if(cont.photo!=""){
						$scope.imageUrl=cont.photo;
					}

                })
                .error(function (erro) {
                    console.log(erro);
                });
      

    }



})();
