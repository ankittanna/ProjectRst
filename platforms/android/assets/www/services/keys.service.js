angular.module('starter.services')
.factory('KeysService', KeysService);

KeysService.$inject = ['$window', '_'];

function KeysService($window, _) {
    var applicationKeys = $window.applicationKeys;
    delete($window.applicationKeys);

    function getKey(feature) {
        return _.filter(applicationKeys, function(item) {
            return item.key === feature;
        })[0].value;
    }

    return {
        getKey: getKey
    };
}