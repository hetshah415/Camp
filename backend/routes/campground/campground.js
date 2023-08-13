const express = require("express");
const router = express.Router();
const catchAsyncError = require("../../../util/catchAsyncError");
const { isLoggedin } = require("../../../middleware/isLoggedin");
const { isAuthor } = require("../../../middleware/isAuthor");
const {
  index,
  detailCampground,
  getNew,
  createNew,
  edit,
  performEdit,
  deleteCampground,
} = require("../../../controllers/campground");
const multer  = require('multer');
const { storage } = require("../../../cloudinary");
const upload = multer({ storage });

router.get("/", catchAsyncError(index));

router.get("/detail/:id", catchAsyncError(detailCampground));

router.get("/new", isLoggedin, catchAsyncError(getNew));

router.post("/add", upload.array('image'), catchAsyncError(createNew));
// router.post("/add",upload.array('image'),(req,res)=>{
//   console.log("reach before");
//   console.log(req.body, req.files);
//   console.log("reach here");
//   res.send("Its done buoy!!!");
// })

router.get("/edit/:id", isLoggedin, isAuthor, catchAsyncError(edit));

router.put("/edit/:id", isLoggedin, isAuthor, upload.array('image') , catchAsyncError(performEdit));

router.delete(
  "/delete/:id",
  isLoggedin,
  isAuthor,
  catchAsyncError(deleteCampground)
);

module.exports = router;
