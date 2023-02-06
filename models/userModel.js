const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'please tell us your first name!'],
  },
  lastName: {
    type: String,
    required: [true, 'please type your last Name!'],
  },
  birthDate: {
    type: Date,
    required: [true, 'Please type your birth date!'],
  },
  city: {
    type: String,
    required: [true, 'Please tell us where you was born'],
  },
  country: {
    type: String,
    required: [true, 'Type your country!'],
  },
  email: {
    type: String,
    required: [true, 'Provide your email!'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please type a valid email'],
  },
  password: {
    type: Number,
    required: [true, 'you must have to enter your password!'],
    minlength: 8,
  },
  passwordConfirm: {
    type: Number,
    required: [true, 'Please confirm your password'],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: `Passwords aren't equal!`,
    },
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
