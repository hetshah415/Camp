const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reviewModel = new Schema({
  feedback: String,
  rating: Number,
  author:{
    type : Schema.Types.ObjectId,
    ref : "User",
  }
});

const ReviewModel = mongoose.model("ReviewModel",reviewModel);

module.exports = ReviewModel;