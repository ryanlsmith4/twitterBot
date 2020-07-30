// index.js
require("dotenv").config();
const Twit = require("twit");
const TWEET = require("./tweet");
const path = require("path");
const log4js = require("log4js");
var logger = log4js.getLogger(path.basename(__filename));
logger.level = "debug";
const fs = require("fs");
const FILEREAD = fs.readFileSync("count.txt", "utf8");

const T = new Twit({
  consumer_key: process.env.APPLICATION_CONSUMER_KEY_HERE,

  consumer_secret: process.env.APPLICATION_CONSUMER_SECRET_HERE,

  access_token: process.env.ACCESS_TOKEN_HERE,

  access_token_secret: process.env.ACCESS_TOKEN_SECRET_HERE,
});

/*  start stream and track tweet
 * this is unfortuantly the only end point available for free that gives the most tweets at any time.
 */
const stream = T.stream("statuses/sample");

// event handler
stream.on("tweet", async (tweet) => {
  let count = FILEREAD;
  // perform some action here'
  const user = tweet.user.screen_name;
  currTweet = tweet;
  console.log(user && tweet.text);
  if (user === "@realDonaldTrump") {
    logger.info(`Wanna be dictator tweeted: ${tweet.text}`);
    try {
      T.post("status/update", TWEET.formTweet(user, tweet.id_str), () => {
        try {
          fs.writeFile("count.txt", count, (err) => {
            if (err) throw err;
            logger.info("Saved Count ", count);
          });
        } catch (err) {
          logger.warn(e);
        }
      });
    } catch (e) {
      logger.warn(`There was an error in the stream ${e}`);
    }
  }
});
