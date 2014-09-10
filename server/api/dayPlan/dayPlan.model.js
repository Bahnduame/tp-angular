'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var DayplanSchema = new Schema({
    dayNum: Number,
    hotels: [{ type: Schema.Types.ObjectId }],
    restaurants: [{ type: Schema.Types.ObjectId }],
    things: [{ type: Schema.Types.ObjectId }]
});

module.exports = mongoose.model('Dayplan', DayplanSchema);