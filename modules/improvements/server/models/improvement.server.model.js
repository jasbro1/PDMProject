'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

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
  likes: Number
});

mongoose.model('Improvement', ImprovementSchema);
