'use strict';
(function () {
   
    angular.module('tcgTrader').controller('menuController', ['AuthService','$state', '$scope', menuCtrl]);

    function menuCtrl(AuthService,$state, $scope) {
        $scope.logout = function() {
              AuthService.logout().then(function () {
                angular.copy({}, self.currentUser);
				localStorage.removeItem('id');
				$state.go('home', {}, {reload: true});
            });
        }
       
    }

})();