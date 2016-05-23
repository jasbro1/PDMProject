'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Submission = mongoose.model('Submission'),
  User = mongoose.model('User'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');


/**
 * Create a Submission
 */
exports.create = function(req, res) {
  var submission = new Submission(req.body);
  submission.user = req.user;
  var user=req.user;
  var points = user._doc.points;
  if(user._doc.points) {
    points = user._doc.points + 20;
  }
  else {
    points=20;
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

  submission.likes=0;
  submission.user = user;

  submission.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(submission);
    }
  });
};

/**
 * Show the current Submission
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var submission = req.submission ? req.submission.toJSON() : {};

  // Add custom fields to the Submission, for determining if the current User is the "owner" and if they are an admin.
  // NOTE: These fields are NOT persisted to the database, since they don't exist in the Submission model.
  submission.isCurrentUserOwner = req.user && submission.user && submission.user._id.toString() === req.user._id.toString() ? true : false;

  // Determine if the current user is an admin
  submission.isAdmin = false;
  for (var i = 0; i < req.user.roles.length; i++) {
    if (req.user.roles[i] === 'admin') {
      submission.isAdmin = true;
    }
  }

  res.jsonp(submission);
};

/**
 * Update a Submission
 */
exports.update = function(req, res) {
  var submission = req.submission ;

  submission = _.extend(submission , req.body);

  console.log('------------------------ Server: '+req.improvementBody);

  submission.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(submission);
    }
  });
};

/**
 * Delete an Submission
 */
exports.delete = function(req, res) {
  var submission = req.submission ;

  submission.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(submission);
    }
  });
};

/**
 * List of Submissions
 */
exports.list = function(req, res) {

  Submission.find().sort('-created').populate('user').exec(function(err, submissions) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(submissions);
    }
  });
};

/**
 * List of Submissions
 */
exports.myList = function(req, res) {

  Submission.find({ 'user': req.user.id }).sort('-created').populate('user').exec(function(err, submissions) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(submissions);
    }
  });
};


/**
 * Submission middleware
 */
exports.submissionByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Submission is invalid'
    });
  }

  Submission.findById(id).populate('user').exec(function (err, submission) {
    if (err) {
      return next(err);
    } else if (!submission) {
      return res.status(404).send({
        message: 'No Submission with that identifier has been found'
      });
    }
    req.submission = submission;
    next();
  });
};
