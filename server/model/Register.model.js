const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: function() {
        return !this.googleAuth && !this.githubAuth;
      },
    },
    googleAuth: {
      type: Boolean,
      default: false,
    },
    githubAuth: {
      type: Boolean,
      default: false,
    }, 
    login_method:{
      type: String,
      default:"email-password",
      required: true,
    },
    githubUsername: String,
    googleUsername: String,
    image: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const User = mongoose.model('User', UserSchema, 'users');

module.exports = User;
