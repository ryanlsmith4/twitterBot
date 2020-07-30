const CDCdata = require("./deaths_api");
const path = require("path");
const log4js = require("log4js");
var logger = log4js.getLogger(path.basename(__filename));
logger.level = "debug";

const formTweet = async (userName, tweetId) => {
  try {
    const data = await CDCdata.getCDCData();
    const tweet = {
      status: `You aren't going to win @${userName} U.S Covid Deaths: ${data["Total_Deaths"]} Total U.S Infections ${data["Total_Infected"]}\n
    Source ${data.Source}`,
      in_reply_to_status_id: tweetId,
    };

    return tweet;
  } catch (e) {
    logger.warn(`There was an exception in formTweet ${e}`);
  }
};

exports.tweet = formTweet;
