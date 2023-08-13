const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

console.log(process.env.CLOUD_NAME);
cloudinary.config({
  cloud_name: 'dlzi3fvkl',
  api_key: '187523498965189',
  api_secret: 'dI6LolTrXN5PFlNbciLNXX9TT5s',
});
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'YelpCamp',
    allowedformats: ['jpeg', 'png', 'jpg'],
  },
});
module.exports = {
  cloudinary,
  storage,
};
