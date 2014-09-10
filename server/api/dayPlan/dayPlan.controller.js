'use strict';

var _ = require('lodash');
var Dayplan = require('./dayPlan.model');

// Get list of dayPlans
exports.index = function(req, res) {
  Dayplan.find()
          .sort('dayNum')
          .populate("hotels restaurants things")
          .exec(function (err, dayPlans){
            if(err) { return handleError(res, err); }
            return res.json(200, dayPlans);
          });
};

// Get a single dayPlan
exports.show = function(req, res) {
  Dayplan.findById(req.params.id, function (err, dayPlan) {
    if(err) { return handleError(res, err); }
    if(!dayPlan) { return res.send(404); }
    return res.json(dayPlan);
  });
};

// Creates a new dayPlan in the DB.
exports.create = function(req, res) {
  Dayplan.create(req.body, function(err, dayPlan) {
    if(err) { return handleError(res, err); }
    return res.json(201, dayPlan);
  });
};

// Updates an existing dayPlan in the DB.
exports.update = function(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  Dayplan.findById(req.params.id, function (err, dayPlan) {
    if (err) { return handleError(res, err); }
    if(!dayPlan) { return res.send(404); }

    for(var key in req.body) {
      dayPlan[key] = req.body[key];
    }
    // dayPlan.markModified('hotels')

    console.log("updated dayPlan"+dayPlan);
    dayPlan.save(function (err, product, numberAffected) {
      if (err) { return handleError(res, err); }
      console.log("product :"+product);
      console.log("numberAffected:"+numberAffected);
      return res.json(200, dayPlan);
    });
  });
};

exports.addActivity = function(req, res){
  Dayplan.findById(req.params.id, function (err, dayPlan) {
    if (err) { return handleError(res, err); }
    if(!dayPlan) { return res.send(404); }

    dayPlan[req.params.type].push(req.params.activityid)

    console.log("updated dayPlan"+dayPlan);

    dayPlan.save(function (err, product, numberAffected) {
      if (err) { return handleError(res, err); }
      console.log("product :"+product);
      console.log("numberAffected:"+numberAffected);
      return res.json(200, dayPlan);
    });
  });
};



// Deletes a dayPlan from the DB.
exports.destroy = function(req, res) {
  Dayplan.findById(req.params.id, function (err, dayPlan) {
    if(err) { return handleError(res, err); }
    if(!dayPlan) { return res.send(404); }
    dayPlan.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}