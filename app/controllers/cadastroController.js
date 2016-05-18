'use strict';
(function () {
    /**
     * @ngdoc function
     * @name todoApp.controller:LoginCtrl
     * @description
     * # LoginCtrl
     * Backand login control - need to implement in order to get the token for authentication
     */

    angular.module('mytodoApp')
        .controller('cadastroController', ['AuthService', '$state', LoginCtrl]);

    function LoginCtrl(AuthService, $state) {
        var self = this;

        self.appName = AuthService.appName;
        self.error = $state.params.error;
        self.socialProviders = AuthService.getSocialProviders();
		
		//console.log(self.socialProviders);

        self.authenticate = function () {       
                self.signup();			
        };

        self.signup = function () {
            var parameters = {company: self.company || ''};

			
			
			
            AuthService.signup(self.firstName, 'wirewolf', self.username, self.password, parameters)
                .then(
                function (response) {
                    //check status of the sign in
                    switch (response.data.currentStatus) {
                        case 1: // The user is ready to sign in
                            $state.go('todos');
                            break;
                        case 2: //The system is now waiting for the user to respond a verification email.
                            self.success = 'Please check your email to continue';
                            break;
                        case 3: //The user signed up and is now waiting for an administrator approval.
                            self.success = 'Please wait for the administrator to approve the sign up';
                            break;
                    }
                }, showError
            );
        };

        self.signin = function () {
            AuthService.signin(self.username, self.password)
                .then(
                function () {
                    $state.go('editProfile');
                },
                showError
            );
        };

        function showError(error) {
            //self.error = error && error.data || error.error_description || 'Unknown error from server';
			alert(error.data);
        }

        function gotoTodos() {
            $state.go('editProfile');
        }

        self.socialSignin = function (provider) {
		
		console.log(provider);		
           
                AuthService.socialSignup(provider)
                    .then(gotoTodos, showError);
              
					
        };

    }


})();