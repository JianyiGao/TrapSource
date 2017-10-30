'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Novicetrees Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/novicetrees',
      permissions: '*'
    }, {
      resources: '/api/novicetrees/:novicetreeId',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/novicetrees',
      permissions: ['get', 'post']
    }, {
      resources: '/api/novicetrees/:novicetreeId',
      permissions: ['get']
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/novicetrees',
      permissions: ['get']
    }, {
      resources: '/api/novicetrees/:novicetreeId',
      permissions: ['get']
    }]
  }]);
};

/**
 * Check If Novicetrees Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If an Novicetree is being processed and the current user created it then allow any manipulation
  if (req.novicetree && req.user && req.novicetree.user && req.novicetree.user.id === req.user.id) {
    return next();
  }

  // Check for user roles
  acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
    if (err) {
      // An authorization error occurred
      return res.status(500).send('Unexpected authorization error');
    } else {
      if (isAllowed) {
        // Access granted! Invoke next middleware
        return next();
      } else {
        return res.status(403).json({
          message: 'User is not authorized'
        });
      }
    }
  });
};
