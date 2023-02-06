const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv');
const app = express();
const eventController = require('./controllers/event.Controller.js');
const { Router } = require('express');
app.use(express.json());

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('Database successfully connected!');
  });

app.post('/api/v1', eventController.createEvent);
app.get('/api/v1', eventController.getEvents);
app.get('/api/v1/events/:id', eventController.getEventById);
app.put('/api/v1/events/:id', eventController.updateEvent);
app.delete('/api/v1/event/:id', eventController.deleteEvent);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Listening on port 3000');
});
