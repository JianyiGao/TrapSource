(function () {
  'use strict';

  // Novicetrees controller
  angular
    .module('novicetrees')
    .controller('NovicetreesController', NovicetreesController);

  NovicetreesController.$inject = ['$scope', '$state', '$window', 'Authentication', 'novicetreeResolve'];

  function NovicetreesController ($scope, $state, $window, Authentication, novicetree) {
    var vm = this;

    vm.authentication = Authentication;
    vm.novicetree = novicetree;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Novicetree
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.novicetree.$remove($state.go('novicetrees.list'));
      }
    }

    // Save Novicetree
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.novicetreeForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.novicetree._id) {
        vm.novicetree.$update(successCallback, errorCallback);
      } else {
        vm.novicetree.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('novicetrees.view', {
          novicetreeId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
