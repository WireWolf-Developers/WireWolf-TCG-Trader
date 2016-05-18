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
            .controller('editPerfilController', ['Backand', '$state', '$http', '$scope', 'AuthService', editPerfilController]);

    function editPerfilController(Backand, $state, $http, $scope, AuthService) {
	
	
	$scope.grava=function(){
		
		$http({
            method: 'PUT',
            url: Backand.getApiUrl() + '/1/objects/users/'+localStorage.getItem('id'),
			data:{
				firstName:self.nome,
				description:self.about,
				photo:$scope.imageUrl
					}})
                .success(function (cont) {

                    $('#modalSucess').modal('show');

                })
                .error(function (erro) {
                    console.log(erro);
                });
		
		
	}
	
	$scope.redirect=function(){
		$state.go('userProfile');
	}
	
	

	$scope.confirma=function(){
		//console.log( $scope.cropper.croppedImage);
		
		$('#modalLoading').modal('show');
		
		  upload(localStorage.getItem('id')+".png", $scope.cropper.croppedImage).then(function (res) {
                    $scope.imageUrl = res.data.url;                   

                    console.log($scope.imageUrl);
					$('#modalLoading').modal('hide');
                }, function (err) {
                    alert(err.data);
					$('#modalLoading').modal('hide');
                });
		
					
		
	};
	
	// register to change event on input file 
        function change() {
            var fileInput = document.getElementById('foto');

            fileInput.addEventListener('change', function (e) {
                $('#modal').modal('show');
            });
        }
	change();
	
	
	 $scope.cropper = {};
        $scope.cropper.sourceImage = null;
        $scope.cropper.croppedImage   = null;
        $scope.bounds = {};
        $scope.bounds.left = 0;
        $scope.bounds.right = 500;
        $scope.bounds.top = 500;
        $scope.bounds.bottom = 0;

	
	
	
	

        // Create a server side action in backand
        // Go to any object's actions tab 
        // and click on the Backand Storage icon.
        // Backand consts:
        var baseUrl = '/1/objects/';
        var baseActionUrl = baseUrl + 'action/'
        var objectName = 'backandUsers';
        var filesActionName = 'salvaFoto';


        $scope.troca = function troca() {
            $("#foto").click();
        }

        // Display the image after upload
        $scope.imageUrl = '../img/profile-example.jpg';

        // Store the file name after upload to be used for delete
        $scope.filename = null;


       

        // input file onchange callback
        function imageChanged(fileInput) {


            //read file content
            var file = fileInput.files[0];
            var reader = new FileReader();

            reader.onload = function (e) {
                upload(file.name, e.currentTarget.result).then(function (res) {
                    $scope.imageUrl = res.data.url;
                    $scope.filename = file.name;

                    console.log($scope.imageUrl);
                }, function (err) {
                    alert(err.data);
                });
            };

            reader.readAsDataURL(file);
        };


      



        // call to Backand action with the file name and file data  
        function upload(filename, filedata) {
		
		
		//console.log(filedata);
            // By calling the files action with POST method in will perform 
            // an upload of the file into Backand Storage
			
			
            return $http({
                method: 'POST',
                url: Backand.getApiUrl() + baseActionUrl + objectName,
                params: {
                    "name": filesActionName
                },
                headers: {
                    'Content-Type': 'application/json'
                },
                // you need to provide the file name and the file data
                data: {
                    "filename": filename,
                    "filedata": filedata.substr(filedata.indexOf(',') + 1, filedata.length) //need to remove the file prefix type
                }
            });
        } ;






        var self = this;

        // self.id = AuthService.currentUser.id;



        //console.log( localStorage.getItem('id'));
        //console.log(Backand.getApiUrl());

		
		$scope.getQtd=function(){
	
			 $http({
            method: 'GET',
            url: Backand.getApiUrl() + '/1/query/data/getQtdCards?parameters=%7B%22id%22:%22'+localStorage.getItem('id')+'%22%7D'})
                .success(function (cont) { 

					
					self.cartas=cont[0].qtd;
                })
                .error(function (erro) {
                    console.log(erro);
                });
	
	}
		
		
        $http({
            method: 'GET',
            url: Backand.getApiUrl() + '/1/objects/users/'+localStorage.getItem('id')})
                .success(function (cont) {

                    console.log(cont);
					
					$scope.getQtd();

                    self.nome = cont.firstName;
                    self.about = cont.description;
                    self.trocas = cont.exchanges;
                    
					if(cont.photo!=""){
						$scope.imageUrl=cont.photo;
					}

                })
                .error(function (erro) {
                    console.log(erro);
                });
      

    }



})();
