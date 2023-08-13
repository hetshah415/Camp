const ReviewModel = require("../models/review");

module.exports.isReviewAuthor = async(req,res,next)=>{
    const { reviewId } = req.params;
    const review = await ReviewModel.findById(reviewId);
    if (!review.author.equals(req.user._id)) {
        req.flash("error", "you don't have permission!!!");
        return res.redirect(`/campgrounds/detail/${id}`);
      }
      next();
}