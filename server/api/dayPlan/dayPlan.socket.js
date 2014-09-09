/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Dayplan = require('./dayPlan.model');

exports.register = function(socket) {
  Dayplan.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Dayplan.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('dayPlan:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('dayPlan:remove', doc);
}