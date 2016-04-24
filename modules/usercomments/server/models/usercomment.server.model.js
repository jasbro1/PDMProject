'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Usercomment Schema
 */
var UsercommentSchema = new Schema({
  body: {
    type: String,
    default: '',
    required: 'Please fill out your Comment body',
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

mongoose.model('Usercomment', UsercommentSchema);
