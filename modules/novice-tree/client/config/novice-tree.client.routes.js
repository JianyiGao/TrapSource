(function () {
  'use strict';

  //Setting up route
  angular
    .module('novice-tree')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    // Novice tree state routing
    $stateProvider
      .state('novice-tree', {
        url: '/novice-tree',
        templateUrl: 'modules/novice-tree/client/views/novice-tree.client.view.html',
        controller: 'NoviceTreeController',
        controllerAs: 'vm'
      });
  }
})();
