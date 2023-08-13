const Campground = require("../models/campground");

module.exports.isAuthor = async(req,res,next)=>{
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if (!campground.author.equals(req.user._id)) {
        req.flash("error", "you don't have permission!!!");
        return res.redirect(`/campgrounds/detail/${id}`);
      }
      next();
}