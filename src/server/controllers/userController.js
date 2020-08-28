const mongoose = require('mongoose');
const User = mongoose.model('User');
const jwt = require('jwt-then');
const {config} = global;

exports.register = async (req, res) => {
  const {
    login,
    password,
    description,
    displayName,
    department,
    rights,
  } = req.body;

  if(login.length < 2) throw 'Nickname must be atleast 2 characters long.';
  if (password.length < 6) throw 'Password must be atleast 6 characters long.';

  const userExists = await User.findOne({login});

  if (userExists) throw 'User with same login already exits.';

  const user = new User({
    login,
    description,
    displayName,
    department,
    // rights,
    password: global.hashPass(password, config.salt),
  });

  await user.save();

  res.json({
    message: 'User [' + login + '] registered successfully!',
  });
};

exports.login = async (req, res) => {
  const { login, password } = req.body;
  const user = await User.findOne({
    login,
    password: global.hashPass(password, config.salt),
  });

  if (!user) throw 'Nickname and Password did not match.';

  const token = await jwt.sign({
    id: user.id,
    description: user.description,
    department: user.department,
    displayName: user.displayName,
    rights: user.rights
  }, config.secret);

  res.json({
    message: 'User logged in successfully!',
    token,
  });
};
