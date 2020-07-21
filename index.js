// index.js
require('dotenv').config()
const Twit = require("twit");

const T = new Twit({
  consumer_key: process.env.APPLICATION_CONSUMER_KEY_HERE,

  consumer_secret: process.env.APPLICATION_CONSUMER_SECRET_HERE,

  access_token: process.env.ACCESS_TOKEN_HERE,

  access_token_secret: process.env.ACCESS_TOKEN_SECRET_HERE,
});

// start stream and track tweets

const stream = T.stream("statuses/sample");

// event handler

stream.on("tweet", (tweet) => {
  // perform some action here'
  console.log(tweet.text+'\n')
});
