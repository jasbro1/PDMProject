'use strict';
/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Usercomment = mongoose.model('Usercomment'),
  User = mongoose.model('User'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Usercomment
 */
exports.create = function(req, res) {
  var usercomment = new Usercomment(req.body);
  var user = req.user;
  usercomment.user = user;
  var points = user._doc.points;

  // A new comment awards the user that posts it  5 points
  if(user._doc.points) {
    points = user._doc.points + 5;
  }
  else {
    points = 5;
  }

  var id = user._id;
  user = _.set(user, 'points', points);

  user.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
    }
  });

  // Get the submissionID from the URL
  var headers = req.headers.referer;
  var headerArray = headers.split('/');

  //Save the submission id to user comment
  usercomment.submission = headerArray[4];

  usercomment.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(usercomment);
    }
  });
};

/**
 * Show the current Usercomment
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var usercomment = req.usercomment ? req.usercomment.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  usercomment.isCurrentUserOwner = req.user && usercomment.user && usercomment.user._id.toString() === req.user._id.toString() ? true : false;

  res.jsonp(usercomment);
};

/**
 * Update a Usercomment
 */
exports.update = function(req, res) {
  var usercomment = req.usercomment ;

  usercomment = _.extend(usercomment , req.body);

  usercomment.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(usercomment);
    }
  });
};

/**
 * Delete an Usercomment
 */
exports.delete = function(req, res) {
  var usercomment = req.usercomment ;

  usercomment.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(usercomment);
    }
  });
};

/**
 * List of Usercomments
 */
exports.list = function(req, res) {
  // Get the submissionID from the URL
  var headers = req.headers.referer;
  var headerArray = headers.split('/');
  var submissionID = headerArray[4];
  Usercomment.find({ 'submission': submissionID }).sort('-created').populate('user', 'displayName').exec(function(err, usercomments) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(usercomments);
    }
  });
};

/**
 * Usercomment middleware
 */
exports.usercommentByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Usercomment is invalid'
    });
  }

  Usercomment.findById(id).populate('user', 'displayName').exec(function (err, usercomment) {
    if (err) {
      return next(err);
    } else if (!usercomment) {
      return res.status(404).send({
        message: 'No Usercomment with that identifier has been found'
      });
    }
    req.usercomment = usercomment;
    next();
  });
};
