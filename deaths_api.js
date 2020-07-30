const fetch = require("node-fetch");
const path = require("path");
const log4js = require("log4js");
var logger = log4js.getLogger(path.basename(__filename));
logger.level = "debug";

const getCDCData = async () => {
  try {
    let data = await fetch(
      "https://api.apify.com/v2/key-value-stores/moxA3Q0aZh5LosewB/records/LATEST?disableRedirect=true"
    );
  } catch (e) {
    logger.warn(`There was an exception in fetch API call ${e} `);
  }

  try {
    data = await data.json();
    const totalDeaths = data.totalDeaths;
    const totalInfected = data.totalCases;
    const source = data.sourceUrl;
    const casesInStates = data.casesByState;
    const stateCaseMap = {};
    stateCaseMap["Total_Deaths"] = totalDeaths;
    stateCaseMap["Total_Infected"] = totalInfected;
    stateCaseMap["Source"] = source;
    for (let i = 0; i < casesInStates.length; i++) {
      let state = String(casesInStates[i].name);
      let range = String(casesInStates[i].range);
      stateCaseMap[state] = range;
    }
    logger.info("Succesful getCDCData");
    return stateCaseMap;
  } catch (e) {
    logger.warn(`There was an exception trying to getCDCData ${e}`);
  }
};

exports.getCDCData = getCDCData;
