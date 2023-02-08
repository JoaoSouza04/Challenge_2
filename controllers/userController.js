const User = require('../models/userModel');

exports.signUp = async (req, res) => {
  try {
    if (!req.body) return res.status(400).send('Please type the fields!');

    let date = new Date(req.body.birthDate);
    if (date.getMonth() === undefined || date.getDate() === undefined)
      return res.status(400).send('Please provide the month and the day!');

    if (date.getFullYear() <= 1910)
      return res.status(400).send('Invalid Date!');

    let checkPassword = req.body.password;
    if (checkPassword.length < 8)
      return res.status(400).send('The password is too short!');
    const user = await User.create(req.body);

    res.status(201).json({
      message: 'User created!',
      data: {
        User: user,
      },
    });
  } catch (err) {
    res.status(400).json({
      message: 'User was not created, please check all the fields!',
    });
  }
};

exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).send('Please provide the fields!');

    const user = await User.findOne({ email }).select('+password');
    const userPassword = user.password;

    if (userPassword !== password)
      return res.status(400).send('The password is wrong!');

    res.status(200).json({
      message: 'that is your user!',
      data: {
        User: user,
      },
    });
  } catch (err) {
    res.status(404).json({
      message: 'User not found!',
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    if (!req.params.id || !req.body)
      return res
        .status(400)
        .send('Please type the id or the update content for an User!');

    if (req.body.firstName === '' || req.body.lastName === '')
      return res.status(400).send('Please provide your name!');

    let checkPassword = req.body.password;
    if (checkPassword.length < 8)
      return res.status(400).send('The password is too short!');

    if (req.body.password != req.body.passwordConfirm)
      return res.status(400).send('Passwords are not equal!');

    const userFound = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: false,
    });

    res.status(200).json({
      message: 'Event updated!',
      data: {
        User: userFound,
      },
    });
  } catch (err) {
    res.status(400).json({
      message: `User wasn't updated`,
    });
    console.log(err);
  }
};
