'use strict';
(function () {
    /**
     * @ngdoc function
     * @name todoApp.controller:LoginCtrl
     * @description
     * # LoginCtrl
     * Backand login control - need to implement in order to get the token for authentication
     */

    angular.module('tcgTrader')
        .controller('loginController', ['AuthService', '$state', LoginCtrl]);

    function LoginCtrl(AuthService, $state) {
        var self = this;

        self.appName = AuthService.appName;
        self.error = $state.params.error;
        self.socialProviders = AuthService.getSocialProviders();
		
		//console.log(self.socialProviders);

        self.authenticate = function () {       
                self.signin();			
        };

   
        self.signin = function () {
            AuthService.signin(self.username, self.password)
                .then(
                function () {
                    $state.go('cardCollection',  {}, {reload: true});
                },
                showError
            );
        };

        function showError(error) {
            self.error = error && error.data || error.error_description || 'Unknown error from server';
			alert(self.error);
        }

        function gotoTodos() {
            $state.go('cardCollection', {}, {reload: true});
        }

        self.socialSignin = function (provider) {
		
		console.log(provider);		
           
                AuthService.socialSignin(provider)
                    .then(gotoTodos, showError);
              
					
        };

    }


})();