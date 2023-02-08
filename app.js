const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv');
const app = express();
const eventController = require('./controllers/eventController.js');
const userController = require('./controllers/userController.js');
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

app.post('/api/v1/events', eventController.createEvent);
app.get('/api/v1/events', eventController.getAllEvents);
app.get('/api/v1/events/:id', eventController.getEventById);
app.put('/api/v1/events/:id', eventController.updateEvent);
app.delete('/api/v1/events/:id', eventController.deleteEvent);

app.post('/api/v1/users/signUp', userController.signUp);
app.post('/api/v1/users/signIn', userController.signIn);
app.put('/api/v1/users/:id', userController.updateUser);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Listening on port 3000');
});
