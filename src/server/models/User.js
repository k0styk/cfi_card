const mongoose = require('mongoose');

//login, password, description, displayName, rights
const userSchema = new mongoose.Schema(
  {
    login: {
      type: String,
      required: 'Login is required!',
    },
    password: {
      type: String,
      required: 'Password is required!',
    },
    description: String,
    displayName: String,
    department: String,
    rights: { type: String, default: 'user' },
    lastLogin: Date
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);