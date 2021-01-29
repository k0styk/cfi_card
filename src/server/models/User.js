const mongoose = require('mongoose');

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
    lastActive: Date,
    rights: { type: String, default: 'user' },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);