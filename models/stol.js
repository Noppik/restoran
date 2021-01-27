var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var StolSchema = new Schema(
  {
    number: {type: Number, required: true},
    booked: {type: Boolean, required: true},
    dataBooked: {type: Date, required: true},
    yesterday: {type: Array, required: true},
    today: {type: Array, required: true},
    tomorrow: {type: Array, required: true}
  }
);

// Virtual for book's URL
StolSchema
.virtual('url')
.get(function () {
  return '/restoran/stols/' + this._id;
});

//Export model
module.exports = mongoose.model('Stol', StolSchema);