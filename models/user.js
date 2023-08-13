const mongoose = require("mongoose");

const schema = mongoose.Schema;

const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new schema({
    email : String,
})

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);

module.exports = User;
