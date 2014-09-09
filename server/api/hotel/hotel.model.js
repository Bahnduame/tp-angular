'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var placeModel = require('../place/place.model');
var placeSchema = placeModel.Place;

var HotelSchema = new Schema({
  name: String,
  place: [placeSchema],
  num_stars: Number,
  amenities: String
});

module.exports = mongoose.model('Hotel', HotelSchema);