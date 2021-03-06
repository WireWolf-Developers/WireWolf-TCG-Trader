(function () {
    angular.module('tcgTrader')
	
	        .service('AuthService', ['Backand', '$http', AuthService]);			
		
		
		
    function AuthService(Backand, $http) {

        var self = this;
        self.currentUser = {};

        loadUserDetails();

        function loadUserDetails() {

            return Backand.getUserDetails()
                .then(function (data) {				
                    self.currentUser.details = data;
                    if(data !== null){
                        self.currentUser.name = data.username	
						
													
								$http ({
									  method: 'GET',
									  url: Backand.getApiUrl() + '/1/query/data/pegaID',
									  params: {
										parameters: {
										  email: self.currentUser.name
										}
									  }
									}).success(function (cont) {
									
									self.currentUser.id=cont[0].id;
									
									localStorage.setItem('id',cont[0].id);								
									
								})
								.error(function (erro) {
									console.log(erro);
								});
			
						
						}				
												
                });

        }

        self.getSocialProviders = function () {
            return Backand.getSocialProviders()
        };

        self.socialSignin = function (provider) {
            Backand.setRunSignupAfterErrorInSigninSocial(false); //by default run sign-up if there is no sign in
            return Backand.socialSignin(provider)
                .then(function (response) {
                    loadUserDetails();
                    return response;
                });
        };

        self.socialSignup = function (provider) {
            return Backand.socialSignUp(provider)
                .then(function (response) {
                  loadUserDetails();
                  return response;
                });
        };

        self.signin = function (username, password) {
            return Backand.signin(username, password)
                .then(function (response) {
                    loadUserDetails();
                    return response;
                });
        };

        self.signup = function (firstName, lastName, username, password, parameters) {
            return Backand.signup(firstName, lastName, username, password, password, parameters)
                .then(function (signUpResponse) {
                    if (signUpResponse.data.currentStatus === 1) {
                        return self.signin(username, password)
                            .then(function () {
                                return signUpResponse;
                            });

                    } else {
                        return signUpResponse;
                    }
                });
        };

        self.changePassword = function (oldPassword, newPassword) {
            return Backand.changePassword(oldPassword, newPassword)
        };

        self.requestResetPassword = function (username) {
            return Backand.requestResetPassword(username)
        };

        self.resetPassword = function (password, token) {
            return Backand.resetPassword(password, token)
        };

        self.logout = function () {		
            return Backand.signout();			
        };
		
		

    }

}());
