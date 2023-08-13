const Campground = require("../models/campground");
const ReviewModel = require("../models/review");
const ExpressError = require("../util/ExpressError");
const joi = require("joi");

module.exports.createReview = async (req, res) => {
    const { id } = req.params;
    const { feedback, range } = req.body;

    const schema = joi.object({
      message: joi.string().required(),
      range: joi.number().required(),
    });
    const result = schema.validate({
      message: feedback,
      range,
    });
    if (result.error) {
      const { error } = result;
      const msg = error.details.map((msg) => msg.message).join(",");
      throw new ExpressError(msg, 400);
    }
    const campground = await Campground.findById(id).populate("reviews");
    const review = await ReviewModel.create({ feedback, rating: range });
    review.author = req.user._id;
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    res.redirect(`/campgrounds/detail/${id}`);
  };

  module.exports.deleteReview = async (req, res) => {
    const { campgroundId, reviewId } = req.params;
    await Campground.findByIdAndUpdate(campgroundId, {
      $pull: { reviews: reviewId },
    });
    await ReviewModel.deleteOne({ _id: reviewId });
    res.redirect(`/campgrounds/detail/${campgroundId}`);
  };