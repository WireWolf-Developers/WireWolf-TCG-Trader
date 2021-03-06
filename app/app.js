'use strict';

angular.module('tcgTrader', [
    'backand',
    'ngResource',
    'ngSanitize',
    'ui.router',
    'ui.sortable',
    'tcgTrader.config.interceptors',
    'ngAnimate',
    'tcgTrader.config.consts',
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

           
                
				 /*=====================================
                 =            Paths of site            =
                 =====================================*/
                         $stateProvider.state('home', {
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

                       
            }]);
