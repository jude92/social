const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      max: 50,
      min: 6,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      max: 50,
      min: 5,
    },
    password: {
      type: String,
      required: true,
      unique: true,
      max: 50,
      min: 5,
    },
    userName: {
      type: String,
      required: false,
      max: 40,
      min: 8,
    },
    handle: {
      type: String,
      required: false,
      max: 50,
      min: 4,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    followers: {
      type: Array,
      default: [],
    },
    following: {
      type: Array,
      default: [],
    },
    /*
    post: {
      type: mongoose.Types.objectId,
      required: false,
      ref: "postmodel",
    },
    comments: {
      type: mongoose.Types.objectId,
      required: false,
      ref: "commentsmodel",
    },
    */
  },
  { timestamps: true }
);

userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};
const userModel = mongoose.model("postit", userSchema);

module.exports = userModel;
