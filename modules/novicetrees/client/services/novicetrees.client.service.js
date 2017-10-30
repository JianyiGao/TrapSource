// Novicetrees service used to communicate Novicetrees REST endpoints
(function () {
  'use strict';

  angular
    .module('novicetrees')
    .factory('NovicetreesService', NovicetreesService);

  NovicetreesService.$inject = ['$resource'];

  function NovicetreesService($resource) {
    return $resource('api/novicetrees/:novicetreeId', {
      novicetreeId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
