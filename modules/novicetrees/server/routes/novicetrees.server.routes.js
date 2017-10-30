'use strict';

/**
 * Module dependencies
 */
var novicetreesPolicy = require('../policies/novicetrees.server.policy'),
  novicetrees = require('../controllers/novicetrees.server.controller');

module.exports = function(app) {
  // Novicetrees Routes
  app.route('/api/novicetrees').all(novicetreesPolicy.isAllowed)
    .get(novicetrees.list)
    .post(novicetrees.create);

  app.route('/api/novicetrees/:novicetreeId').all(novicetreesPolicy.isAllowed)
    .get(novicetrees.read)
    .put(novicetrees.update)
    .delete(novicetrees.delete);

  // Finish by binding the Novicetree middleware
  app.param('novicetreeId', novicetrees.novicetreeByID);
};
