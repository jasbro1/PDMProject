'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * User Voting Schema
 */
var UserWhoVotedSchema = new Schema({
  voteValue: {
    type: Number
  },
  userWhoVoted: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

/**
 * Improvement Schema
 */
var ImprovementSchema = new Schema({
  body: {
    type: String,
    default: '',
    required: 'Please fill Improvement body',
    trim: true
  },
  submission: {
    type: Schema.ObjectId,
    ref: 'Submission'
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  userWhoVoted: [UserWhoVotedSchema],
  likes: Number
});

mongoose.model('UserWhoVoted', UserWhoVotedSchema);
mongoose.model('Improvement', ImprovementSchema);
