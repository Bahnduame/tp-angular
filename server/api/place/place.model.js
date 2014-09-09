'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PlaceSchema = new Schema({
  address: String,
  city: String,
  state: String,
  phone: String,
  location: [Number, Number]
});

module.exports = mongoose.model('Place', PlaceSchema);