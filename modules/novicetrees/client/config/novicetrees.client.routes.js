'use strict';

// Configure the 'novice_tree' module routes
angular.module('novicetrees').config(['$stateProvider',
  function ($stateProvider) {
    $stateProvider
      .state('novicetrees', {
        url: '/novicetree',
        templateUrl: 'modules/novicetrees/client/views/view-novicetree.client.view.html',
      });
  }
]);
