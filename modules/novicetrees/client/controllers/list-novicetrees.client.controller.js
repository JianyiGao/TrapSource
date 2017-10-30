(function () {
  'use strict';

  angular
    .module('novicetrees')
    .controller('NovicetreesListController', NovicetreesListController);

  NovicetreesListController.$inject = ['NovicetreesService'];

  function NovicetreesListController(NovicetreesService) {
    var vm = this;

    vm.novicetrees = NovicetreesService.query();
  }
}());
