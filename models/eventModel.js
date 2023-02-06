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
      const date = new Date();
      date.setUTCHours(-3);

      const day = date.getDate();
      return date;
    },
    // required: [
    //   true,
    //   'An event must have the date when it was created, please type it!',
    // ],
  },
});

const User = mongoose.model('User', eventSchema);

module.exports = User;
