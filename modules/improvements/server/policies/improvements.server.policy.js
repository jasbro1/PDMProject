'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Improvements Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/improvements',
      permissions: '*'
    }, {
      resources: '/api/improvements/:improvementId',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/improvements',
      permissions: ['get', 'post']
    }, {
      resources: '/api/improvements/:improvementId',
      permissions: ['get', 'put']
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/improvements',
      permissions: ['get']
    }, {
      resources: '/api/improvements/:improvementId',
      permissions: ['get']
    }]
  }]);
};

/**
 * Check If Improvements Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If an Improvement is being processed and the current user created it then allow any manipulation
  if (req.improvement && req.user && req.improvement.user && req.improvement.user.id === req.user.id) {
    return next();
  }
  // Else statement is filler code
  else {
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
