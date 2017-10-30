(function() {
  'use strict';

  // Novice tree module config
  angular
    .module('novice-tree')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // Config logic
    // ...
  }
})();
