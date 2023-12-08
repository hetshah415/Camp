require('dotenv').config();
const Campground = require("../models/campground");
const { ObjectId } = require("mongodb");
const Joi = require("joi");
const ExpressError = require("../util/ExpressError");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const MapBoxToken = process.env.MAPBOX_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: MapBoxToken });

/**
 * Retrieves all campgrounds from the database and renders the show page.
 */
module.exports.index = async (req, res) => {
  const campgrounds = await Campground.find({});
  res.render("campground/show", { campgrounds });
};

/**
 * Displays detailed information about a specific campground.
 * Throws an error if the campground ID is invalid or the campground is not found.
 */
module.exports.detailCampground = async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    throw new ExpressError("invalid campground ID");
  }
  const detailCampground = await Campground.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("author");

  if (!detailCampground) {
    req.flash("error", "camground not found!!");
    return res.redirect("/campgrounds");
  }
  res.render("campground/detail", { campground: detailCampground });
};

/**
 * Renders the form for adding a new campground.
 */
module.exports.getNew = async (req, res) => {
  res.render("campground/new");
};

/**
 * Creates a new campground with the provided data and redirects to the campgrounds page.
 * If geocoding fails or validation fails, it throws an error.
 */
module.exports.createNew = async (req, res, next) => {
  const result = await geocodingClient.forwardGeocode({
    query: req.body.location,
    limit: 2
  })
    .send();
  const { location, description, image, price, title } = req.body;
  const schema = Joi.object({
    title: Joi.string().required(),
    location: Joi.string().required(),
    price: Joi.number().required().min(0),
    description: Joi.string(),
  });

  const newCampground = await Campground.create({
    location,
    description,
    image: req.files.map((f) => ({ url: f.path, filename: f.filename })),
    geometry: result.body.features[0].geometry,
    price,
    title,
    author: req.user._id,
  });
  req.flash("success", "successfully added new campground");
  res.redirect("/campgrounds");
};

/**
 * Renders the edit form for an existing campground.
 * Throws an error if the campground is not found.
 */
module.exports.edit = async (req, res) => {
  const { id } = req.params;
  const editProduct = await Campground.findById(id);
  res.render("campground/edit", editProduct);
};

/**
 * Updates an existing campground and redirects to the campground detail page.
 * Handles image deletion and addition.
 */
module.exports.performEdit = async (req, res) => {
  const { title, location, image, price, description } = req.body;
  const { id } = req.params;
  console.log(req.body);
  const imgs = req.files.map((f) => ({ url: f.path, filename: f.filename }));
  const updatedCampground = await Campground.findByIdAndUpdate(id, {
    title,
    location,
    image,
    price: Number(price),
    description,
  });
  updatedCampground.image.push(...imgs);
  await updatedCampground.save();
  if (req.body.deletedItem) {
    await updatedCampground.updateOne({
      $pull: { image: { filename: { $in: req.body.deletedItem } } },
    });
  }
  req.flash("success", "successfully updated campground");
  res.redirect("/campgrounds");
};


/**
 * Deletes a campground and redirects to the campgrounds page.
 */
module.exports.deleteCampground = async (req, res) => {
  const { id } = req.params;
  const deleteProduct = await Campground.deleteOne({ _id: id });
  req.flash("success", "successfully deleted campground");
  res.redirect("/campgrounds");
};
