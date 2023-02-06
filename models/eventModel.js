const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  description: {
    type: String,
    required: [true, 'An event must have a description, please type it'],
    maxlength: 300,
    minleangth: 3,
    trim: true,
  },
  userId: {
    type: String,
    required: [true, 'An event must have an id, please type it!'],
    unique: true,
    trim: true,
  },
  dateTime: {
    type: Date,
    required: [true, 'An event must have an date, please type it!'],
  },
  createdAt: {
    type: Date,
    default: function newDate() {
      let date = new Date();
      date.setUTCHours(date.getHours());
      return date;
    },
  },
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
