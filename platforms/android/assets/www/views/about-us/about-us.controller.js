angular.module('starter.controllers')
.controller('AboutUsController', AboutUsController);

AboutUsController.$inject = ['KeysService', '_'];

function AboutUsController(KeysService, _) {
    var vm = this,
    feature = KeysService.getKey('ABOUT_US');

    console.log("*****************"+ feature.title);

    vm.name = feature.title;

}