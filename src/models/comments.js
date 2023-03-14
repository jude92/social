const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  comments: {
    type: String,
    required: true,
    max: 300,
  },
});

const commentsModel = mongoose.model("commentsmodel", commentSchema);
module.exports = commentsModel;
