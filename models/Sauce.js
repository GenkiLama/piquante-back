const mongoose = require("mongoose");

const SauceSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: [true, "You forgot the name !!!"],
    },
    manufacturer: {
      type: String,
      required: [true, "You forgot the manufacturer !"],
    },
    description: {
      type: String,
      required: [true, "Tell me more about your sauce !"],
      maxlength: 100,
    },
    mainPepper: {
      type: String,
      required: [true, "What the hell did you put in there ?!"],
    },
    imageUrl: {
      type: String,
      required: [true, "Send pictures, pls ;)"],
    },
    heat: {
      type: Number,
      required: [true, "Is it hot ?!"],
      min: 1,
      max: 10,
    },
    likes: {
      type: Number,
      required: true,
      default: 0,
    },
    dislikes: {
      type: Number,
      required: true,
      default: 0,
    },
    usersLiked: {
      type: Array,
      required: true,
    },
    usersDisliked: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Sauce", SauceSchema);
