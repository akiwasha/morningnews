const mongoose = require("mongoose");

const wishlistSchema = mongoose.Schema({
  title: String,
  description: String,
  content: String,
  urlToImage: String,
});

const userSchema = mongoose.Schema({
  wishlist: wishlistSchema,
  username: String,
  email: String,
  password: String,
  token: String,
  salt: String,
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
