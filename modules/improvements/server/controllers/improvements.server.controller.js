'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Improvement = mongoose.model('Improvement'),
  UserWhoVoted = mongoose.model('UserWhoVoted'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Improvement
 */
exports.create = function(req, res) {
  var improvement = new Improvement(req.body);
  var user = req.user;
  improvement.user = user;
  var likes = user._doc.likes;

  // A new comment awards the user that posts it  5 points
  if(user._doc.likes) {
    likes = user._doc.likes + 10;
  }
  else {
    likes = 10;
  }
  
  user = _.set(user, 'likes', likes);

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
  
  //Save submissionID to the improvement
  improvement.submission = headerArray[4];

  improvement.likes = 0;

  improvement.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(improvement);
    }
  });
};

/**
 * Show the current Improvement
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var improvement = req.improvement ? req.improvement.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  improvement.isCurrentUserOwner = req.user && improvement.user && improvement.user._id.toString() === req.user._id.toString() ? true : false;

  res.jsonp(improvement);
};

/**
 * Update a Improvement
 */
exports.update = function(req, res) {
  var improvement = req.improvement ;
  var voteValue = req.body.likes - improvement.likes;

  // If the update call is because a user voted on something
  if (voteValue!==0) {
    var userWhoVoted = new UserWhoVoted();
    userWhoVoted.voteValue = voteValue;
    userWhoVoted.userWhoVoted = req.body.user._id;
    console.log('------ VoteValue: ' + voteValue);
    improvement._doc.userWhoVoted.push(userWhoVoted);
  }
  // Else it must be because the user is editing their improvement
  else{
    improvement = _.extend(improvement , req.body);
  }

  improvement.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(improvement);
    }
  });
};

/**
 * Delete an Improvement
 */
exports.delete = function(req, res) {
  var improvement = req.improvement ;

  improvement.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(improvement);
    }
  });
};

/**
 * List of Improvements
 */
exports.list = function(req, res) {
  // Get the submissionID from the URL
  var headers = req.headers.referer;
  var headerArray = headers.split('/');
  var submissionID = headerArray[4];
  Improvement.find({ 'submission': submissionID }).sort('-created').populate('user', 'displayName').exec(function(err, improvements) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(improvements);
    }
  });
};

/**
 * Improvement middleware
 */
exports.improvementByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Improvement is invalid'
    });
  }

  Improvement.findById(id).populate('user', 'displayName').exec(function (err, improvement) {
    if (err) {
      return next(err);
    } else if (!improvement) {
      return res.status(404).send({
        message: 'No Improvement with that identifier has been found'
      });
    }
    req.improvement = improvement;
    next();
  });
};
