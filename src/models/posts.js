const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },

    texts: {
      type: String,
      required: true,
    },

    likes: {
      type: Array,
      default: [],
    },
    dislikes: {
      type: Array,
      default: [],
    },
    /*
  Comments: {
    type: mongoose.Types.objectId,
    required: true,
    ref: "commentsmodel",
  },*/
  },
  { timestamps: true }
);

const postmodel = mongoose.model("postmodel", postSchema);
module.exports = postmodel;
