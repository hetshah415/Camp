const mongoose = require("mongoose");
const client = require("../db/dbConnection");
const Campground = require("../models/campground");
const cities = require("./cities");
const { descriptors, places } = require("./dummyData");

client
  .then(() => {
    console.log("Successfully connected to database");
  })
  .catch((e) => {
    console.log("Some unexpected error occurred");
    console.log(e);
  });

  const arrayHelper = array => array[Math.floor(Math.random()*array.length)];

const dummyData = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i <= 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random()*20)+10;
    const camp = new Campground({
      author : "648402416d2c4b8ab9745a9e",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title : `${arrayHelper(descriptors)}, ${arrayHelper(places)}`,
      geometry: { type: 'Point', coordinates: [ cities[random1000].longitude, cities[random1000].latitude] },
      image:
      [
        {
          url: 'https://res.cloudinary.com/dlzi3fvkl/image/upload/v1689614176/YelpCamp/pw4rzkhh85yfknpbygnt.jpg',
          filename: 'YelpCamp/pw4rzkhh85yfknpbygnt',
        }
      ],
      description :  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!",
      price : price
    });
    await camp.save();
  }
};

dummyData();
