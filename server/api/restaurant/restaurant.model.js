'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var placeModel = require('../place/place.model');
var placeSchema = placeModel.Place;

var RestaurantSchema = new Schema({
  name: String,
  place: [placeSchema],
  cuisine: String,
  price: Number
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);