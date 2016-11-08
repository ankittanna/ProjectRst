angular.module('starter.services', [])
.factory('KeysService', KeysService);

KeysService.$inject = ['$http'];

function KeysService($http) {
    var applicationKeys = {};

    applicationKeys = $http.get('keys/keys.json');

    function test() {
        console.log('Hiiiiiiiiiiiiiiii');
    }

    return {
        applicationKeys: applicationKeys,
        test: test
    };
}