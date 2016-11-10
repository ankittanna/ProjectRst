angular.module('starter.services', [])
.factory('_', LodashFactory);

LodashFactory.$inject = ['$window'];

function KeysService($window) {
    var _ = $window._;
    return _;
}