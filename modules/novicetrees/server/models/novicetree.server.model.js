'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Novicetree Schema
 */
var NovicetreeSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Novicetree name',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Novicetree', NovicetreeSchema);
