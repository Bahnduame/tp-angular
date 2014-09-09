'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var DayplanSchema = new Schema({
    dayNum: Number,
    hotels: [Schema.Types.ObjectId],
    restaurants: [Schema.Types.ObjectId],
    things: [Schema.Types.ObjectId]
});

module.exports = mongoose.model('Dayplan', DayplanSchema);