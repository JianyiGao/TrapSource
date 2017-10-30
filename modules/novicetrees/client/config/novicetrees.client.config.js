(function () {
  'use strict';

  angular
    .module('novicetrees')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Novice Tree',
      state: 'novicetrees',
      roles: ['*']
    });
  }
}());
