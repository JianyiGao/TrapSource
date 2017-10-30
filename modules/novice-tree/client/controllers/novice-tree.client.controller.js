(function() {
  'use strict';

  angular
    .module('novice-tree')
    .controller('NoviceTreeController', NoviceTreeController);

  NoviceTreeController.$inject = ['$scope'];

  function NoviceTreeController($scope) {
    var vm = this;

    // Novice tree controller logic
    // ...

    init();

    function init() {
    }
  }
})();
