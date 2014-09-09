'use strict';

var _ = require('lodash');
var Thingtodo = require('./thingtodo.model');

// Get list of thingtodos
exports.index = function(req, res) {
  Thingtodo.find(function (err, thingtodos) {
    if(err) { return handleError(res, err); }
    return res.json(200, thingtodos);
  });
};

// Get a single thingtodo
exports.show = function(req, res) {
  Thingtodo.findById(req.params.id, function (err, thingtodo) {
    if(err) { return handleError(res, err); }
    if(!thingtodo) { return res.send(404); }
    return res.json(thingtodo);
  });
};

// Creates a new thingtodo in the DB.
exports.create = function(req, res) {
  Thingtodo.create(req.body, function(err, thingtodo) {
    if(err) { return handleError(res, err); }
    return res.json(201, thingtodo);
  });
};

// Updates an existing thingtodo in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Thingtodo.findById(req.params.id, function (err, thingtodo) {
    if (err) { return handleError(res, err); }
    if(!thingtodo) { return res.send(404); }
    var updated = _.merge(thingtodo, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, thingtodo);
    });
  });
};

// Deletes a thingtodo from the DB.
exports.destroy = function(req, res) {
  Thingtodo.findById(req.params.id, function (err, thingtodo) {
    if(err) { return handleError(res, err); }
    if(!thingtodo) { return res.send(404); }
    thingtodo.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}