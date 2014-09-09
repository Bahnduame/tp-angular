'use strict';

var _ = require('lodash');
var Hotel = require('./hotel.model');

// Get list of hotels
exports.index = function(req, res) {
  Hotel.find(function (err, hotels) {
    if(err) { return handleError(res, err); }
    return res.json(200, hotels);
  });
};

// Get a single hotel
exports.show = function(req, res) {
  Hotel.findById(req.params.id, function (err, hotel) {
    if(err) { return handleError(res, err); }
    if(!hotel) { return res.send(404); }
    return res.json(hotel);
  });
};

// Creates a new hotel in the DB.
exports.create = function(req, res) {
  Hotel.create(req.body, function(err, hotel) {
    if(err) { return handleError(res, err); }
    return res.json(201, hotel);
  });
};

// Updates an existing hotel in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Hotel.findById(req.params.id, function (err, hotel) {
    if (err) { return handleError(res, err); }
    if(!hotel) { return res.send(404); }
    var updated = _.merge(hotel, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, hotel);
    });
  });
};

// Deletes a hotel from the DB.
exports.destroy = function(req, res) {
  Hotel.findById(req.params.id, function (err, hotel) {
    if(err) { return handleError(res, err); }
    if(!hotel) { return res.send(404); }
    hotel.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}