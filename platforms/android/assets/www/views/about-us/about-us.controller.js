angular.module('starter.controllers')
.controller('AboutUsController', AboutUsController);

AboutUsController.$inject = ['KeysService', '_'];

function AboutUsController(KeysService, _) {
    var vm = this;
    vm.name = 'About Us';

    //var a = KeysService;

    var a = ['1', '2', '3', '4'];
    _.forEach(a, function(item) {
        console.log('Itel ******** ' + item);
    });
}