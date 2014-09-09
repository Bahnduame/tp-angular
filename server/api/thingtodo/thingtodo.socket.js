/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Thingtodo = require('./thingtodo.model');

exports.register = function(socket) {
  Thingtodo.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Thingtodo.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('thingtodo:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('thingtodo:remove', doc);
}