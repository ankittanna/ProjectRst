'use strict';

angular.module('starter.controllers')
.controller('AboutUsController', AboutUsController);

AboutUsController.$inject = [ 'KeysService' ];

function AboutUsController(KeysService) {
    var vm = this,
    feature = KeysService.getKey('ABOUT_US');

    vm.name = feature.title;
}
