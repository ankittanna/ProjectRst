angular.module('starter.services')
.factory('KeysService', KeysService);

KeysService.$inject = ['$http', '_'];

function KeysService($http, _) {
    var applicationKeys = $http.get('keys/keys.json') || {};

    function getKey(feature) {
        return _.filter(applicationKeys, function (value, key) {
            return key === feature;
        });
    }

    return {
        applicationKeys: applicationKeys,
        getKey: getKey
    };
}