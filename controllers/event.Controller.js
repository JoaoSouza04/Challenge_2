const User = require('../models/eventModel.js');

exports.createEvent = async (req, res) => {
  try {
    const bodyDate = new Date(req.body.dateTime);
    const date = new Date();
    date.setUTCHours(-3);

    if (date <= bodyDate) {
      const newUser = await User.create(req.body);

      res.status(201).json({
        message: 'Event successfully created!',
        data: {
          User: newUser,
        },
      });
    } else {
      res.status(400).json({
        message: 'Invalid Date!',
      });
    }
  } catch (err) {
    res.status(400).json({
      message: `Event wasn't created, check if you entered all the parameters or maybe the correct parameters`,
    });
  }
};

exports.getEvents = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({
      message: 'This is all the events that i have!',
      data: {
        User: users,
      },
    });
  } catch (err) {
    res.status(404).json({
      message: `I couldn't found!`,
    });
  }
};

exports.getEventById = async (req, res) => {
  try {
    if (!req.params.id)
      return res.status(400).json({
        message: 'Please type the id of an event!',
      });

    const id = req.params.id;

    userFind = await User.findById(id);

    res.status(200).json({
      message: `That´s the user found!`,
      data: {
        User: userFind,
      },
    });
  } catch (err) {
    res.status(404).json({
      message: 'User not found!',
    });
  }
};
