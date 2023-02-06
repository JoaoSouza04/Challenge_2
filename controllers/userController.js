const User = require('../models/userModel');

exports.signUp = async (req, res) => {
  try {
    if (!req.body) return res.send('Please type the fields!');

    let date = new Date(req.body.birthDate);
    date = date.getFullYear();
    if (date <= 1910) return res.send('Invalid Date!');

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
    if (!email || !password) return res.send('Please provide the fields!');

    const user = await User.findOne({ email }).select('+password');
    const userPassword = user.password;

    if (userPassword !== password) return res.send('The password is wrong!');
    res.status(200).json({
      message: 'this is your user!',
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
