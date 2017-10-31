(function() {
  'use strict';

  angular
    .module('novice-tree')
    .controller('NoviceTreeController', NoviceTreeController);

  NoviceTreeController.$inject = ['$scope'];

  function NoviceTreeController($scope) {
    var vm = this;

    $scope.treeOptions = {
      accept: function(sourceNodeScope, destNodesScope, destIndex) {
        if (destNodesScope.nodrop || destNodesScope.outOfDepth(sourceNodeScope)) {
          return false;
        }
        return true;
      },
      dropped: function(event) {
      },
      dragStart: function(event) {
      },
      dragMove: function(event) {
      },
      dragStop: function(event) { 
      },
    };
    init();

    function init() {
    }
  }
})();
