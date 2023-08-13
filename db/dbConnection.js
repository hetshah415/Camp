const mongoose = require("mongoose");

const uri =  "mongodb+srv://hetshah415:hetshah123@cluster0.nfrjorh.mongodb.net/";

const client = mongoose.connect(uri);

module.exports = client;