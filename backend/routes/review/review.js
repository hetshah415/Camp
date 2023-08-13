const express = require("express");
const router = express.Router();
const catchAsyncError = require("../../../util/catchAsyncError");
const { isReviewAuthor } = require("../../../middleware/isReviewAuthor");
const { isLoggedin } = require("../../../middleware/isLoggedin");
const { createReview, deleteReview } = require("../../../controllers/review");

router.post("/:id", isLoggedin, catchAsyncError(createReview));

router.delete(
  "/:campgroundId/delete/:reviewId",
  isReviewAuthor,
  catchAsyncError(deleteReview)
);

module.exports = router;
