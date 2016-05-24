
(function () {

    angular.module('tcgTrader')
        .service('ProfileService', ['$http', 'Backand', 'AuthService', ProfileService]);

    function ProfileService($http, Backand, AuthService) {

        var self = this;    
		 // Create a server side action in backand
        // Go to any object's actions tab 
        // and click on the Backand Storage icon.
        // Backand consts:
        var baseUrl = '/1/objects/';
        var baseActionUrl = baseUrl + 'action/'
        var objectName = 'backandUsers';
        var filesActionName = 'salvaFoto';
		

	    /* 
            Get Local User
             */
        self.get = function () {
            return $http({
            method: 'GET',
            url: Backand.getApiUrl() + '/1/objects/users/'+localStorage.getItem('id')})
			.then(function(response) {
                return response.data;
            });
        };
		
		
		 /*
             Get the user number of cards 
             SELECT count(*) as qtd FROM card WHERE idUsers='{{id}}'
             */
		self.getQtd = function () {
            return  $http({
            method: 'GET',
            url: Backand.getApiUrl() + '/1/query/data/getQtdCards',
			 params: {
                        parameters: {
                            id: localStorage.getItem('id')
                        }
                    }			
			})			
			.then(function(response) {
                return response.data;
            });
        };
		
		//update the user data
		self.grava = function (nome, about, img) {
            return  $http({
            method: 'PUT',
            url: Backand.getApiUrl() + '/1/objects/users/'+localStorage.getItem('id'),
			data:{
				firstName:nome,
				description:about,
				photo:img
					}})		
			.then(function(response) {
                return response.data;
            });
        };
		
		//upload picture to the Backand Server
		self.upload = function (filename, filedata) {
            return  $http({
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
            })
			.then(function(response) {
                return response.data;
            });
        };

       
    }
}());
