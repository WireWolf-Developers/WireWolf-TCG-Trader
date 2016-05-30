angular.module('tcgTrader').controller('searchUsersController',
        function ($scope, $http, $state, Backand, SearchUsersService,ProfileService) {

        var self = this;
       //    $scope.filtro='';
            $scope.users = [];

//        $http({
//            method: 'GET',
//            url: Backand.getApiUrl() + '/1/objects/users'})
//                .success(function (cont) {
//                   // console.log(cont.data);
//            $scope.users=cont.data;
//                })
//                .error(function (erro) {
//                    console.log(erro);
//                });
  //get all users
            $scope.getusers = function () {
                SearchUsersService.getUsers().then(onSuccess, errorHandler);
            };
            function onSuccess(users) {
                $scope.users = users;
            }
            function errorHandler(error) {
                if (error) {
                    console.log(error);
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

            //initialize getusers
            $scope.getusers();
       


    });
