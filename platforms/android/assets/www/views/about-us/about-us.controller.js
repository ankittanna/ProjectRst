angular.module('starter.controllers')
.controller('AboutUsController', AboutUsController);

AboutUsController.$inject = ['KeysService'];

function AboutUsController(KeysService) {
    var vm = this;
    vm.name = 'About Us';

    var a = KeysService;
}