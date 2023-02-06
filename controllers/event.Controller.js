const Event = require('../models/eventModel.js');

exports.createEvent = async (req, res) => {
  try {
    const bodyDate = new Date(req.body.dateTime);
    const date = new Date();
    date.setUTCHours(date.getHours());

    if (date <= bodyDate) {
      const newEvent = await Event.create(req.body);
      res.status(201).json({
        message: 'Event successfully created!',
        data: {
          Event: newEvent,
        },
      });
    } else return res.send('Invalid date!');
  } catch (err) {
    res.status(400).json({
      message: `Event wasn't created, check if you entered all the parameters or maybe the correct parameters`,
    });
  }
};

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find();

    res.status(200).json({
      message: 'This is all the events!',
      data: {
        Event: events,
      },
    });
  } catch (err) {
    res.status(404).json({
      message: 'Events not found!',
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

    eventFind = await Event.findById(id);

    res.status(302).json({
      message: `That´s the event found!`,
      data: {
        Event: eventFind,
      },
    });
  } catch (err) {
    res.status(404).json({
      message: 'Event not found!',
    });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    if (!req.params.id || !req.body)
      return res.status(400).json({
        message: 'Please type the id or the update content for an event!',
      });

    const eventFind = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      message: 'Event updated!',
      data: {
        Event: eventFind,
      },
    });
  } catch (err) {
    res.status(400).json({
      message: `Event wasn't updated`,
    });
  }
  //falta bloquear a manipulação dos campos de userId e createdAt
};

exports.deleteEvent = async (req, res) => {
  try {
    if (!req.params.id) return res.send('Please type the id of an event!');

    const deletedEvent = await Event.findByIdAndDelete(req.params.id);

    if (deletedEvent === null) return res.send('Id not found!');

    res.status(200).json({
      message: 'this it what has been deleted!',
      data: {
        Event: deletedEvent,
      },
    });
  } catch (err) {
    res.status(400).json({
      message:
        'Event was not deleted!, please check if you entered the right id',
    });
  }
};
