angular.module('starter.services', [])
.factory('KeysService', KeysService);

KeysService.$inject = ['$http'];

function KeysService($http) {
    var applicationKeys = {};

    applicationKeys = $http.get('keys/keys.json');
/*
    function getKey(feature) {
        return _.filter(applicationKeys, function (value, key) {
            return key === feature;
        });
    }*/

    return {
        applicationKeys: applicationKeys
    };
}