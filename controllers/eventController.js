const Event = require('../models/eventModel.js');

exports.createEvent = async (req, res) => {
  try {
    const newEvent = await Event.create(req.body);
    res.status(201).json({
      message: 'Event successfully created!',
      data: {
        Event: newEvent,
      },
    });
  } catch (err) {
    res.status(400).json({
      message: `Event wasn't created, check if you entered all the parameters or maybe the correct parameters`,
    });
  }
};

exports.getAllEvents = async (req, res) => {
  try {
    let events;

    if (req.query) {
      const queryObj = { ...req.query };
      const excludedFields = ['page', 'sort', 'limit', 'fields'];
      excludedFields.forEach((el) => delete queryObj[el]);

      const query = queryObj.dayOfTheWeek;
      events = await Event.find({ day: query });

      if (events.length === 0) events = await Event.find();
    } else {
      events = await Event.find();
    }
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

    eventFind = await Event.findById(req.params.id);

    if (eventFind === null) return res.send('Type another id!');

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

    const eventFound = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    date = new Date(req.body.dateTime);
    eventFound.day = date.getUTCDate();
    eventFound.save();

    if (eventFound === null) return res.send('Please type a valid id!');

    res.status(200).json({
      message: 'Event updated!',
      data: {
        Event: eventFound,
      },
    });
  } catch (err) {
    res.status(400).json({
      message: `Event wasn't updated`,
    });
    console.log(err);
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
