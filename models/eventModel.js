const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  description: {
    type: String,
    required: [true, 'An event must have a description, please type it'],
    maxlength: 300,
    minlength: 3,
    trim: true,
  },
  userId: {
    type: String,
    required: [true, 'An event must have an id, please type it!'],
    unique: true,
    trim: true,
    minlength: 8,
  },
  dateTime: {
    type: Date,
    required: [true, 'An event must have an date, please type it!'],
    min: function date() {
      let date = new Date();
      date.setUTCDate(date.getDate());
      date.setUTCHours(date.getHours());
      return date;
    },
  },
  createdAt: {
    type: Date,
    default: function newDate() {
      let date = new Date();
      date.setUTCHours(date.getHours());
      return date;
    },
  },
  day: {
    type: Number,
    default: function day() {
      let date = new Date(this.dateTime);
      return date.getUTCDate();
    },
    select: false,
  },
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
