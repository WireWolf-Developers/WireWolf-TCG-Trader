'use strict';
(function () {

    angular.module('tcgTrader')
            .controller('editPerfilController', ['Backand', '$state', '$http', '$scope', 'AuthService', 'ProfileService', editPerfilController]);

    function editPerfilController(Backand, $state, $http, $scope, AuthService, ProfileService) {
	
	
		 var self = this;


        $scope.grava = function () {

            ProfileService.grava(self.nome, self.about, $scope.imageUrl).then(updateSuccess, errorHandler);
        }

        function updateSuccess() {
            $('#modalSucess').modal('show');

        }

        $scope.redirect = function () {

            $('#modalSucess').modal('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();

            $state.go('userProfile');
        }



        $scope.confirma = function () {

            $('#modalLoading').modal('show');

            //upload image to Backand Server
            ProfileService.upload(localStorage.getItem('id') + ".png", $scope.cropper.croppedImage).then(uploadSuccess, errorHandler);
        };

        function uploadSuccess(res) {
            $scope.imageUrl = res.url + '?' + new Date().getTime();
            $('#modalLoading').modal('hide');
        }

        // register to change event on input file 
        function change() {
            var fileInput = document.getElementById('foto');

            //open modal with cropper
            fileInput.addEventListener('change', function (e) {
                $('#modal').modal('show');
            });
        }
        change();

        //initialize cropper
        $scope.cropper = {};
        $scope.cropper.sourceImage = null;
        $scope.cropper.croppedImage = null;
        $scope.bounds = {};
        $scope.bounds.left = 0;
        $scope.bounds.right = 500;
        $scope.bounds.top = 500;
        $scope.bounds.bottom = 0;        


        $scope.troca = function troca() {
            $("#foto").click();
        }

        // Display the image after upload
        $scope.imageUrl = 'img/profile-example.jpg';

        // Store the file name after upload to be used for delete
        $scope.filename = null;


       



        $scope.getQtd = function () {
            ProfileService.getQtd().then(getQtdSuccess, errorHandler);
        }

        //the service function return an array with one object that contains the property number
        function getQtdSuccess(number) {
            self.cartas = number[0].qtd;

        }


        //get user data
        $scope.getProfile = function () {

            ProfileService.get().then(getSuccess, errorHandler);

        }

        function getSuccess(data) {
            self.nome = data.firstName;
            self.about = data.description;
            self.trocas = data.exchanges;
            if (data.photo != "") {
                $scope.imageUrl = data.photo;
            }
            $scope.getQtd();
        }

        $scope.getProfile();


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

    }


})();
