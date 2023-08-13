const mongoose = require("mongoose");
const ReviewModel = require("./review");

const Schema = mongoose.Schema;
const opts = { toJSON: { virtuals: true } };
const campgroundSchema = Schema({
  title: String,
  location: String,
  price: Number,
  geometry : {
    type:{
      type: String,
      enum:['Point'],
      required: true
    },
    coordinates:{
      type: [Number],
      required: true
    }
  },
  image: [
    {
      url : String,
      filename : String
    }
  ],
  description: String,
  author : {
    type : Schema.Types.ObjectId,
    ref : "User",
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "ReviewModel",
    },
  ],
},opts);

campgroundSchema.virtual('properties.popUpMarkup').get(function(){
  return `<a href=/campgrounds/detail/${this._id}>${this.title}</a>`;
})

campgroundSchema.post('findOneAndDelete', async (doc) => {
  if (doc) {
    await ReviewModel.remove({
      _id: {
        $in: doc.reviews,
      },
    });
  }
});
const Campground = mongoose.model("Campground", campgroundSchema);

module.exports = Campground;
