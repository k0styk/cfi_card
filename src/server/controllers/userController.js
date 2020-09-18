const mongoose = require('mongoose');
const User = mongoose.model('User');
const events = require('../../client/Events');
const {config} = global;

exports.register = async ({
  login,
  password,
  description,
  displayName,
  department,
  rights
}, cb) => {
  let message = 'Register [ ' + login + ' ] successfull';

  if (login.length < 2) {
    message = 'Login must be atleast 2 characters long.';
    cb({ eventName: events.user.register_err, message });
    return;
  };
  if (password.length < 6) {
    message = 'Password must be atleast 6 characters long.';
    cb({ eventName: events.user.register_err, message });
    return;
  }
  const userExists = await User.findOne({ login });

  if (userExists) {
    message = 'User with same login already exits.';
    cb({ eventName: events.user.register_err, message });
    return;
  };

  const user = new User({
    login,
    password: global.hashPass(password, config.salt),
    description: description ? description : undefined,
    displayName: displayName ? displayName : undefined,
    department: department ? department : undefined,
    rights: rights ? rights : undefined,
  });

  await user.save();
  message = 'User [ ' + login + ' ] registered successfully!';
  cb({ eventName: events.user.register_success, message });
};

exports.login = async ({login,password}) => {
  const user = await User.findOne({
    login,
    password: global.hashPass(password, config.salt),
  });

  if(user) {
    user.lastLogin = new Date();
    user.save();
  }

  return user;
};