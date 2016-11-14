'use strict';

angular.module('starter.services', [])
.factory('_', LodashFactory);

LodashFactory.$inject = [ '$window' ];

function LodashFactory($window) {
    var _ = $window._;

    return _;
}
