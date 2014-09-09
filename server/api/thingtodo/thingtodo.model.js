'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var placeModel = require('../place/place.model');
var placeSchema = placeModel.Place;

var ThingtodoSchema = new Schema({
  name: String,
  place: [placeSchema],
  age_range: String
});

module.exports = mongoose.model('Thingtodo', ThingtodoSchema);