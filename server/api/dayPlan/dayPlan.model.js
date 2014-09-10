'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var DayplanSchema = new Schema({
    dayNum: Number,
    hotels: [{type: Schema.Types.ObjectId, ref:'Hotel' }],
    things: [{type: Schema.Types.ObjectId, ref:'Thingtodo' }],
    restaurants: [{type: Schema.Types.ObjectId, ref:'Restaurant' }]
});

module.exports = mongoose.model('Dayplan', DayplanSchema);