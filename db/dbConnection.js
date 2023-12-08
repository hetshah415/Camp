const mongoose = require("mongoose");
require('dotenv').config();

const uri =  process.env.URI;

const client = mongoose.connect(uri);

module.exports = client;