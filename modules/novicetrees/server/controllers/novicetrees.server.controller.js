'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Novicetree = mongoose.model('Novicetree'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Novicetree
 */
exports.create = function(req, res) {
  var novicetree = new Novicetree(req.body);
  novicetree.user = req.user;

  novicetree.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(novicetree);
    }
  });
};

/**
 * Show the current Novicetree
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var novicetree = req.novicetree ? req.novicetree.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  novicetree.isCurrentUserOwner = req.user && novicetree.user && novicetree.user._id.toString() === req.user._id.toString();

  res.jsonp(novicetree);
};

/**
 * Update a Novicetree
 */
exports.update = function(req, res) {
  var novicetree = req.novicetree;

  novicetree = _.extend(novicetree, req.body);

  novicetree.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(novicetree);
    }
  });
};

/**
 * Delete an Novicetree
 */
exports.delete = function(req, res) {
  var novicetree = req.novicetree;

  novicetree.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(novicetree);
    }
  });
};

/**
 * List of Novicetrees
 */
exports.list = function(req, res) {
  Novicetree.find().sort('-created').populate('user', 'displayName').exec(function(err, novicetrees) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(novicetrees);
    }
  });
};

/**
 * Novicetree middleware
 */
exports.novicetreeByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Novicetree is invalid'
    });
  }

  Novicetree.findById(id).populate('user', 'displayName').exec(function (err, novicetree) {
    if (err) {
      return next(err);
    } else if (!novicetree) {
      return res.status(404).send({
        message: 'No Novicetree with that identifier has been found'
      });
    }
    req.novicetree = novicetree;
    next();
  });
};
