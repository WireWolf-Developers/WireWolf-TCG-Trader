'use strict';

angular.module('mytodoApp', [
    'backand',
    'ngResource',
    'ngSanitize',
    'ui.router',
    'ui.sortable',
    'mytodoApp.config.interceptors',
    'ngAnimate',
    'mytodoApp.config.consts',
    'angular-img-cropper'
])
        .config(['$stateProvider', '$httpProvider', '$urlRouterProvider', 'BackandProvider', 'CONSTS',
            function ($stateProvider, $httpProvider, $urlRouterProvider, BackandProvider, CONSTS) {
                BackandProvider.setAnonymousToken(CONSTS.anonymousToken)
                        .setSignUpToken(CONSTS.signUpToken)
                        .setAppName(CONSTS.appName);

                //By default in the SDK when signup is success it's automatically signin.
                //In this app we wanted to show all the process so we turned it off.
                BackandProvider.runSigninAfterSignup(false);

                $httpProvider.interceptors.push('todoHttpInterceptor');

                $urlRouterProvider.otherwise("/");

            $stateProvider
                .state('main', {
                    url: '/main',
                    abstract: true,
                    templateUrl: 'views/main/header.html',
                    controller: 'HeaderCtrl as header'
                })
				 /*=====================================
                 =            Paths of site            =
                 =====================================*/
                        .state('home', {
                            url: '/',
                            templateUrl: 'templates/index.html', 
                            controller: 'indexController as index'
                          })
                        .state('login', {
                            url: '/login',
                            templateUrl: 'templates/login.html', 
                            controller: 'loginController as login'
                          })
                        .state('newUser', {
                            url: '/register',
                            templateUrl: 'templates/new-user.html',
                            controller: 'cadastroController as signup'
                        })
                        .state('userProfile', {
                            url: '/profile',
                            templateUrl: 'templates/user-profile.html',
                            controller: 'viewPerfilController'
                        })
                        .state('editProfile', {
                            url: '/edit-profile',
                            templateUrl: 'templates/edit-profile.html',
                            controller: 'editPerfilController as editPerfil'

                        })
                        .state('searchUsers', {
                            url: '/search-users',
                            templateUrl: 'templates/search-users.html',
                            controller: 'searchUsersController'
                        })

                        .state('cardCollection', {
                            url: '/collection',
                            templateUrl: 'templates/card-collection.html',
                            controller: 'cardCollectionController as cardCollection'
                        })
                        .state('searchCards', {
                            url: '/search-cards',
                            templateUrl: 'templates/search-cards.html',
                            controller: 'searchCardController as cardSearch'
                        })
                        .state('searchExchangeable', {
                            url: '/search-ex-cards',
                            templateUrl: 'templates/search-exchangeable-cards.html',
                            controller: 'searchExchangeableCardController as cardSearch'
                        })
                        .state('cardsToExchange', {
                            url: '/to-exchange',
                            templateUrl: 'templates/my-exchangeable.html',
                            controller: 'myExchangeableController'
                        })
                        .state('exchangeCards', {
                            url: '/exchange/:id',
                            templateUrl: 'templates/exchange.html',
                            controller: 'exchangeController'
                        })
                        .state('cardDetails', {
                            url: '/card-details/:multiverseid',
                            templateUrl: 'templates/card-details.html',
                            controller: 'cardDetailsController'
                        })
                        .state('myCardDetails', {
                            url: '/my-card-details/:id',
                            templateUrl: 'templates/my-card-details.html',
                            controller: 'myCardDetailsController'
                        })
                        /*=====  End of Paths of site  ======*/

                        .state('todos', {
                            url: '',
                            parent: 'main',
                            templateUrl: 'views/main/todoList.html',
                            controller: 'TodoListCtrl as todoList'
                        })
                        .state('changePassword', {
                            url: 'changePassword',
                            parent: 'main',
                            templateUrl: 'views/auth/change-password.html',
                            controller: 'ChangePasswordCtrl as changePassword'
                        })
                        .state('login2', {
                            url: '/login2',
                            templateUrl: 'views/auth/login.html',
                            controller: 'LoginCtrl as login',
                            params: {
                                error: null
                            }
                        })
                        .state('resetPassword', {
                            url: '/resetPassword',
                            templateUrl: 'views/auth/reset-password.html',
                            controller: 'ResetPasswordCtrl as resetPassword'
                        });
            }]);

'use strict';
(function () {
    /**
     * @ngdoc function
     * @name todoApp.controller:TodoListCtrl
     * @description
     * # TodoListCtrl
     * Todo List controller of the todoApp for viewing and adding to do items
     */
    angular.module('mytodoApp')
        .controller('TodoListCtrl', ['TodoService', TodoListCtrl]);

    function TodoListCtrl(TodoService) {
        var self = this;

        /**
         * init by reading the to do list from the database
         */
        clearError();
        readTodoList();

        /**
         * Read the to do list from the database
         */
        function readTodoList() {
            TodoService.readAll().then(onReadListSuccess, errorHandler);
        }

        /**
         * Success promise call with the lit data
         * @param data
         */
        function onReadListSuccess(todos) {
            self.todos = todos;
        }

        /**
         * Update item in the database
         * @param todo
         */
        self.updateTodo = function (todo) {
            clearError();
            TodoService.update(todo.id, todo)
                .then(null, errorHandler);
        };

        /**
         * Add new item
         */
        self.addTodo = function () {
            clearError();
            TodoService.create(self.todo)
                .then(onAddTodoSuccess, errorHandler);
            self.todo = '';
        };

        /**
         * Success promise call with the new item added
         * @param data
         */
        function onAddTodoSuccess(todo) {
            self.todos.push(todo);
        }

        /**
         * Remove item from the database and from the list
         * @param todo
         */
        self.removeTodo = function (todo) {
            clearError();
            TodoService.delete(todo.id).then(function () {
                self.todos.splice(self.todos.indexOf(todo), 1);
            }, errorHandler);
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

            readTodoList();
        }

        function clearError() {
            self.error = null;
        }

    }

})();

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
        .controller('HeaderCtrl', ['$state', 'AuthService', HeaderCtrl]);

    function HeaderCtrl($state, AuthService) {
        var self = this;

        self.currentUser = AuthService.currentUser;

        /**
         * Logout from Backand
         */
        self.logout = function () {
            AuthService.logout();
            $state.go('login');
        };

    }

})();

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
        .controller('LoginCtrl', ['AuthService', '$state', LoginCtrl]);

    function LoginCtrl(AuthService, $state) {
        var self = this;

        self.appName = AuthService.appName;
        self.error = $state.params.error;
        self.socialProviders = AuthService.getSocialProviders();

        self.authenticate = function () {
            self.error = null;
            self.success = null;

            if (self.newUser) {
                self.signup();
            } else {
                self.signin();
            }
        };

        self.signup = function () {
            var parameters = {company: self.company || ''};

            AuthService.signup(self.firstName, self.lastName, self.username, self.password, parameters)
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
                    $state.go('todos');
                },
                showError
            );
        };

        function showError(error) {
            self.error = error && error.data || error.error_description || 'Unknown error from server';
        }

        function gotoTodos() {
            $state.go('todos');
        }

        self.socialSignin = function (provider) {
            self.newUser ?
                AuthService.socialSignup(provider.name)
                    .then(gotoTodos, showError) :
                AuthService.socialSignin(provider.name)
                    .then(gotoTodos, showError);
        };

    }


})();
'use strict';
(function () {
    /**
     * @ngdoc function
     * @name todoApp.controller:ResetPasswordCtrl
     * @description
     * # ResetPasswordCtrl
     * Backand reset password controller - request change password link to be sent via email
     */

    angular.module('mytodoApp')
        .controller('ResetPasswordCtrl', ['AuthService', '$location', '$state', ResetPasswordCtrl]);

    function ResetPasswordCtrl(AuthService, $location, $state) {
        var self = this;

        function init() {
            self.token = $location.search().token;
            self.sendEmail = !angular.isDefined(self.token);
        }

        self.reset = function () {
            self.error = null;
            self.success = null;

            if (self.sendEmail) {
                AuthService.requestResetPassword(self.username)
                    .then(
                    function () {
                        self.success = 'Please check your email to continue';
                    },
                    function (response) {
                        self.error = response && response.data || 'Unknown error from server';
                    }
                )
            }
            else {
                if (self.newPassword != self.confirmPassword) {
                    self.error = 'Password must match';
                }
                else
                    AuthService.resetPassword(self.newPassword, self.token)
                        .then(
                        function () {
                            $state.go('login');
                        },
                        function (response) {
                            self.error = response && response.data || 'Unknown error from server';
                        }
                    )
            }
        };

        init();
    }


})();
'use strict';
(function () {
    /**
     * @ngdoc function
     * @name todoApp.controller:ChangePasswordCtrl
     * @description
     * # ChangePasswordCtrl
     * Backand change password controller -
     * change password for signed in user (with old password) and for forgot password (with token)
     */

    angular.module('mytodoApp')
        .controller('ChangePasswordCtrl', ['AuthService', '$location', ChangePasswordCtrl]);

    function ChangePasswordCtrl(AuthService, $location) {
        var self = this;

        function init() {
            self.token = $location.search().token;
        }

        self.update = function () {
            self.error = null;
            self.success = null;

            if (self.newPassword != self.confirmPassword) {
                self.error = 'Password must match';
            }
            else {
                self.token ?
                    AuthService.resetPassword(self.newPassword, self.token)
                        .then(changePasswordSuccess, changePasswordError) :
                    AuthService.changePassword(self.oldPassword, self.newPassword)
                        .then(changePasswordSuccess, changePasswordError)
            }
        };

        function changePasswordSuccess() {
            self.oldPassword = self.newPassword = self.confirmPassword = null;
            self.success = 'Password was changed successfully.';
        }

        function changePasswordError(response) {
            self.error = response && response.data || 'Unknown error from server';
        }

        init();
    }

})();
(function () {
    angular.module('mytodoApp')
	
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
									
									//console.log("IdUser: "+self.currentUser.id);
									
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
            Backand.signout().then(function () {
                angular.copy({}, self.currentUser);
            });
        };

    }

}());

/**
 * Created by Itay Herskovits  on 2/1/15.
 */
(function () {

    angular.module('mytodoApp')
        .service('TodoService', ['$http', 'Backand', 'AuthService', TodoService]);

    function TodoService($http, Backand, AuthService) {

        var self = this;
        var baseUrl = Backand.getApiUrl() + '/1/objects/';

        var objectName = 'todo';

        self.readAll = function () {
            return $http({
                method: 'GET',
                url: baseUrl + objectName
            }).then(function(response) {
                return response.data.data;
            });
        };

        self.readOne = function (id) {
            return $http({
                method: 'GET',
                url: baseUrl + objectName + '/' + id
            }).then(function(response) {
                return response.data;
            });
        };

        self.create = function (description) {
            return $http({
                method: 'POST',
                url : baseUrl + objectName,
                data: {
                    description: description
                },
                params: {
                    returnObject: true
                }
            }).then(function(response) {
                return response.data;
            });
        };

        self.update = function (id, data) {
            return $http({
                method: 'PUT',
                url : baseUrl + objectName + '/' + id,
                data: data
            }).then(function(response) {
                return response.data;
            });
        };

        self.delete = function (id) {
            return $http({
                method: 'DELETE',
                url : baseUrl + objectName + '/' + id
            })
        };

    }
}());

(function () {
    'use strict';

    function todoHttpInterceptor($q, $injector, Backand) {
        return {
            requestError: function (rejection) {
                return $q.reject(rejection);
            },
            response: function (response) {
                return response;
            },
            responseError: function (rejection) {
                if ((rejection.config.url + "").indexOf('token') === -1) {
                    // When using refresh token, on 401 responses
                    // Backand SDK manages refreshing the session and re-sending the requests
                    if (rejection.status === 401 && !Backand.isManagingRefreshToken()) {
                        var errorMessage =
                            Backand.getUsername() ?
                                'The session has expired, please sign in again.' :
                                null;
                        $injector.get('$state').go('login', {error: errorMessage}, {reload: true});
                        $injector.get('AuthService').logout();
                    }
                }
                return $q.reject(rejection);
            }
        };
    }

    angular.module('mytodoApp.config.interceptors', [])
        .factory('todoHttpInterceptor', ['$q', '$injector', 'Backand', todoHttpInterceptor]);
})();

(function() {
  angular.module('mytodoApp.config.consts', [])
    .constant('CONSTS', {
      anonymousToken: 'f64fa82f-9384-4361-af9a-08b2c3190b5c',
      signUpToken: '4779d3d0-16fc-48d4-9fa6-0acb899a6df1',
      appName: 'angularattack2016wirewolftcg'
    });

})();

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
                    $state.go('cardCollection');
                },
                showError
            );
        };

        function showError(error) {
            self.error = error && error.data || error.error_description || 'Unknown error from server';
			alert(self.error);
        }

        function gotoTodos() {
            $state.go('cardCollection');
        }

        self.socialSignin = function (provider) {
		
		console.log(provider);		
           
                AuthService.socialSignin(provider)
                    .then(gotoTodos, showError);
              
					
        };

    }


})();
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
            .controller('searchUsersController', ['Backand', '$state','$scope', '$http', 'AuthService', searchUsersController]);

    function searchUsersController(Backand, $state,$scope, $http, AuthService) {
        var self = this;
       //    $scope.filtro='';
            $scope.users = [];

        // self.id = AuthService.currentUser.id;

        //console.log( localStorage.getItem('id'));
        //console.log(Backand.getApiUrl());

        $http({
            method: 'GET',
            url: Backand.getApiUrl() + '/1/objects/users'})
                .success(function (cont) {
                   // console.log(cont.data);
            $scope.users=cont.data;
                })
                .error(function (erro) {
                    console.log(erro);
                });
    }

})();

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
            .controller('addCardController', ['Backand', '$state', '$scope', '$http', 'AuthService', addCardController]);

    function addCardController(Backand, $state, $scope, $http, AuthService) {
        var self = this;
        $scope.card = {
            card: 'teste',
            exchangeable: 1,
            exchanged: 1,
            idUsers: 1,
            name: 'About',
            type: 'normal',
            collection: 'normal',
            colors: 'red'
        };

        $scope.addCard = function () {
            $http.post(Backand.getApiUrl() + '/1/objects/card', $scope.card)
                    .success(function () {
                        console.log('Card Adicionado com Sucesso');
                    })
                    .error(function () {
                        console.log('erro ao cadastrar');
                    });



//             $http({
//            method: 'POST',
//            url: Backand.getApiUrl() + '/1/objects/card',
//            data:{
//                card: 'teste',
//                exchangeable: 1,
//                exchanged: 1,
//                idUsers: 1,
//                name: 'About',
//                type: 'normal',
//                collection: 'normal',
//                colors: 'red'
//                 
//            }
//        })
//                .success(function (cont) {
//                     console.log("salvou");
//                 //   $scope.users = cont.data;
//                })
//                .error(function (erro) {
//                    console.log(erro);
//                });
        };

    }

})();


angular.module('mytodoApp').controller('searchCardController', 

  ["$scope", "$http", "$state", function($scope, $http, $state) {
           
        var url = 'https://api.deckbrew.com/mtg';
        var self = this;
        $scope.colors = [];
        $scope.cards = [];
        $scope.sets = [];
        $scope.types = [];

        // Search cards with paramenters
        $scope.searchCards = function(){
          $http.get(url + '/cards',
            {params:{"set": $scope.set, "color": $scope.color, "rarity": $scope.rarity, "type": $scope.type, "name":$scope.name}})
            .then(function successCallback(response) {
              var json = JSON.stringify(response) 
             // alert(json);
              // item-collection-thumbnail" ng-src="http://gatherer.wizards.com/Handlers/Image.ashx?type=card&multiverseid={{user.editions[0].multiverse_id}}
              $scope.cards = response.data;
			       //console.log($scope.cards);
            }, function errorCallback(response) {
              alert(JSON.stringify(response));
            });
        };

        // Return all cards (the first 100)
        $scope.getAllCards = function() {
          $http.get(url + '/cards?page=1')
            .then(function successCallback(response) {
              var json = JSON.stringify(response) 
             // alert(json);
              $scope.cards = response.data;
			         //console.log($scope.cards[0].editions[0].image_url);
            }, function errorCallback(response) {
              alert(JSON.stringify(response));
            });
        };

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

        }]);

angular.module('mytodoApp').controller('searchExchangeableCardController', 

  ["$scope", "$http", "$state", "Backand", function($scope, $http, $state, Backand) {
           
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
		
        }]);
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
            .controller('cardDetailsController', ['Backand', '$state', '$http', '$scope', 'AuthService', cardDetailsController]);

    function cardDetailsController(Backand, $state, $http, $scope, AuthService) {

        var url = 'https://api.deckbrew.com/mtg';

        $scope.cardId = $state.params.multiverseid;



        $scope.add = function () {
            //alert(localStorage.getItem('id'));
            //  console.log($scope.details);
            $http({
                method: 'POST',
                url: Backand.getApiUrl() + '/1/objects/card',
                data: {
                    card: $scope.cardId,
                    idUsers: localStorage.getItem('id'),
                    name: $scope.name,
                    type: $scope.type,
                    collection: $scope.set,
                    colors: $scope.colors,
                    urlImage: $scope.img

                }
            })
                    .success(function (cont) {
                        console.log("salvou");
                        $('#modalSucess').modal('show');
                        //   $scope.users = cont.data;
                    })
                    .error(function (erro) {
                        console.log(erro);
                    });
        };

        $scope.getDetails = function () {
            //   console.log($scope.cardId);
            $http.get(url + '/cards?multiverseid=' + $scope.cardId)
                    .then(function successCallback(response) {
                        var json = JSON.stringify(response);
                        // alert(json);
                        $scope.details = response.data[0];
                        $scope.name = $scope.details.name;
                        $scope.type = $scope.details.types.join('-');
                        $scope.description = $scope.details.text;
                        $scope.rarity = $scope.details.editions[0].rarity;
                        $scope.number = $scope.details.editions[0].number;
                        $scope.set = $scope.details.editions[0].set;
                        $scope.power = $scope.details.power + "/" + $scope.details.toughness;
                        $scope.img = $scope.details.editions[0].image_url;
                        $scope.colors = $scope.details.colors.join('-');

                    }, function errorCallback(response) {
                        alert(JSON.stringify(response));
                    });
        };

        $scope.getDetails();


        $scope.redirect = function () {
            $state.go('searchCards');
        }

    }



})();

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
            .controller('myExchangeableController', ['Backand', '$state', '$scope', '$http', 'AuthService', myExchangeableController]);

    function myExchangeableController(Backand, $state, $scope, $http, AuthService) {
        var self = this;
        $scope.cards = [];
        
        
            $scope.removeTrade = function(card) {
                       console.log(card.id);
               $http ({
                method: 'PUT',
                url: Backand.getApiUrl() + '/1/objects/card/'+card.id,
                data: {
                  exchangeable: 0
                }
              })
               .success(function () {
                //   console.log("Alterado");
                    var indice=$scope.cards.indexOf(card);
                    $scope.cards.splice(indice,1);
                //$('#modalSucess').modal('show');
                })
                .error(function (erro) {
                    console.log(erro);
                });
              
           
        };
        
        
        
        
        $http({
            method: 'GET',
            url: Backand.getApiUrl() + '/1/query/data/cardsExchangeables',
            params: {
                parameters: {
                    idUser: localStorage.getItem('id')
                }
            }
        })
                .success(function (cont) {
                    $scope.cards = cont;
                   // console.log($scope.cards);
                })
                .error(function (erro) {
                    console.log(erro);
                });
                $scope.myCardDetails = function(id) {
                    $state.go('myCardDetails', {id: id});
                  };
                  
                  

    }
    ;



})();

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
            .controller('exchangeController', ['Backand', '$state', '$http', '$scope', 'AuthService', exchangeController]);

    function exchangeController(Backand, $state, $http, $scope, AuthService) {

        var url = 'https://api.deckbrew.com/mtg';

        $scope.desiredCardId = $state.params.id;
		$scope.idUserToTrade=0;
		$scope.ownCard="";
		
		console.log("Id da carta: "+$state.params.id);
		
		
		$scope.incrementTrade=function(id){
				 $http({
            method: 'GET',
            url: Backand.getApiUrl() + '/1/query/data/incrementaTroca?parameters=%7B%22id%22:%22'+id+'%22%7D'})
                .success(function (cont) {                                 

                })
                .error(function (erro) {
                    console.log(erro);
                });
		}
		
		
		
		$scope.myToThem=function(){
		
		$http({
            method: 'PUT',
            url: Backand.getApiUrl() + '/1/objects/card/'+$scope.ownCard,
			data:{
				idUsers:$scope.idUserToTrade,
				exchangeable:0
					}})
                .success(function (cont) {

					console.log("Carta: "+$scope.ownCard+" para usu�rio: "+$scope.idUserToTrade);
                   // $('#modalSucess').modal('show');

                })
                .error(function (erro) {
                    console.log(erro);
                });
		
		
		}
		
		$scope.themToMy=function(){
		
		
			$http({
            method: 'PUT',
            url: Backand.getApiUrl() + '/1/objects/card/'+$scope.desiredCardId,
			data:{
				idUsers:localStorage.getItem('id'),
				exchangeable:0
					}})
                .success(function (cont) {

					console.log("Carta: "+$scope.desiredCardId+" para usu�rio: "+localStorage.getItem('id'));
                   // $('#modalSucess').modal('show');

                })
                .error(function (erro) {
                    console.log(erro);
                });
		
		}
		
		
		$scope.trade=function(){
			if($scope.ownCard==""){
				$("#modalAlerta").modal('show');
			}else{
				$scope.myToThem();
				$scope.themToMy();
				$scope.incrementTrade($scope.idUserToTrade);
				$scope.incrementTrade(localStorage.getItem('id'));
				
				
				$('#modalOk').modal('show');
				
			}
		}

		$scope.getDesired=function(){
		
			 $http({
            method: 'GET',
            url: Backand.getApiUrl() + '/1/objects/card/'+$scope.desiredCardId})
                .success(function (cont) {                                     
					$scope.desiredImg=cont.urlImage;
					$scope.idUserToTrade=cont.idUsers;
					
					console.log($scope.idUserToTrade);
                })
                .error(function (erro) {
                    console.log(erro);
                });
		}

		$scope.getDesired();
       

        $scope.getDetails = function () {
            //   console.log($scope.cardId);
            $http.get(url + '/cards?multiverseid=' + $scope.cardId)
                    .then(function successCallback(response) {
                        var json = JSON.stringify(response);
                        // alert(json);
                        $scope.details = response.data[0];
                        $scope.name = $scope.details.name;
                        $scope.type = $scope.details.types.join('-');
                        $scope.description = $scope.details.text;
                        $scope.rarity = $scope.details.editions[0].rarity;
                        $scope.number = $scope.details.editions[0].number;
                        $scope.set = $scope.details.editions[0].set;
                        $scope.power = $scope.details.power + "/" + $scope.details.toughness;
                        $scope.img = $scope.details.editions[0].image_url;
                        $scope.colors = $scope.details.colors.join('-');

                    }, function errorCallback(response) {
                        alert(JSON.stringify(response));
                    });
        };

       $scope.myEx=function(){
		    $scope.cards = [];
				$http({
					method: 'GET',
					url: Backand.getApiUrl() + '/1/query/data/cardsExchangeables',
					params: {
						parameters: {
							idUser: localStorage.getItem('id')
						}
					}
				})
                .success(function (cont) {
                    $scope.cards = cont;
                   // console.log($scope.cards);
                })
                .error(function (erro) {
                    console.log(erro);
                });
	   }
	   
	   $scope.myEx();
	   
	   $scope.choose=function(id, img){
			$scope.ownCard=id;
			$scope.selectedImg=img;
			$("#selectOne").addClass('transparent');			
	   }


        $scope.redirect = function () {
            $state.go('cardCollection');
        }

    }



})();

'use strict';
(function () {
    /**
     * @ngdoc function
     * @name todoApp.controller:LoginCtrl
     * @description
     * # LoginCtrl
     * Backand login control - need to implement in order to get the token for authentication
     */

    angular.module('mytodoApp').controller('indexController', ['$state', '$scope', IndexCtrl]);

    function IndexCtrl($state, $scope) {
        $scope.loginPage = function() {
            $state.go('login');    
        }

        $scope.createPage = function() {
            $state.go('newUser');    
        }
    }

})();
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
            .controller('myCardDetailsController', ['Backand', '$state', '$http', '$scope', 'AuthService', myCardDetailsController]);

    function myCardDetailsController(Backand, $state, $http, $scope, AuthService) {

        var url = 'https://api.deckbrew.com/mtg';
        $scope.message = "";
        $scope.id = $state.params.id;
        $scope.show=0;
        // console.log($scope.id);

        $scope.removeTrade = function () {
            $http({
                method: 'PUT',
                url: Backand.getApiUrl() + '/1/objects/card/' + $scope.id,
                data: {
                    exchangeable: 0
                }
            })
                    .success(function () {
                        //   console.log("Alterado");
                        $scope.message = "Card removed from echangeable area";
                        $scope.url = "cardsToExchange";
                        $('#modalSucess').modal('show');
                    })
                    .error(function (erro) {
                        console.log(erro);
                    });
            ;

        };
        $scope.addTrade = function () {
            $http({
                method: 'PUT',
                url: Backand.getApiUrl() + '/1/objects/card/' + $scope.id,
                data: {
                    exchangeable: 1
                }
            })
                    .success(function () {
                        // console.log("Alterado");
                        $scope.url = "cardCollection";
                        $scope.message = "Card add to Trade";
                        $('#modalSucess').modal('show');
                    })
                    .error(function (erro) {
                        console.log(erro);
                    });
            ;

        };
        
         $scope.removeCollection = function () {
            $http({
                method: 'DELETE',
                url: Backand.getApiUrl() + '/1/objects/card/' + $scope.id
            })
                    .success(function () {
                        //   console.log("Alterado");
                        $scope.message = "Card removed from collection";
                        $scope.url = "cardCollection";
                        $('#modalSucess').modal('show');
                    })
                    .error(function (erro) {
                        console.log(erro);
                    });
            ;

        };
        
        
        
        $scope.redirect = function (url) {
            $state.go(url);
        };

        //GetDetails na API
        $scope.getDetails = function (id) {
            $http.get(url + '/cards?multiverseid=' + id)
                    .then(function successCallback(response) {
                        var json = JSON.stringify(response);
                        // alert(json);
                        $scope.details = response.data[0];
                        //  console.log( $scope.details);
                        $scope.name = $scope.details.name;
                        $scope.type = $scope.details.types.join('-');
                        $scope.description = $scope.details.text;
                        $scope.rarity = $scope.details.editions[0].rarity;
                        $scope.number = $scope.details.editions[0].number;
                        $scope.set = $scope.details.editions[0].set;
                        $scope.power = $scope.details.power + "/" + $scope.details.toughness;
                        $scope.img = $scope.details.editions[0].image_url;
                        $scope.colors = $scope.details.colors.join('-');

                    }, function errorCallback(response) {
                        alert(JSON.stringify(response));
                    });
        };

        //busca a carta no bd pelo id
        return $http({
            method: 'GET',
            url: Backand.getApiUrl() + '/1/objects/card/' + $scope.id
        })
                .success(function (cont) {
                    $scope.mycard = cont;
                  console.log($scope.mycard.exchangeable);
                    if($scope.mycard.exchangeable===1){
                        $scope.show=1;
                    }else{
                        $scope.show=0;
                    }
            
            
                    $scope.getDetails($scope.mycard.card);
                })
                .error(function (erro) {
                    console.log(erro);
                });





    }



})();
