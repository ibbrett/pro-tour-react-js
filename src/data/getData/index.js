const fs = require("fs");
const axios = require("axios");
const cheerio = require("cheerio");

const urls = [
  {
    baseUrl: "https://www.worldsurfleague.com/athletes/tour/mct?year=2023",
    gender: "men",
  },
  {
    baseUrl:
      "https://www.worldsurfleague.com/athletes/tour/wct?regionId=1&amp;seasonNumber=1&amp;year=2023",
    gender: "women",
  },
];
const baseSelector = "#primary > div > div > div.new-page-body > div";

const getAthleteId = (str) => {
  const arr = str.split(" ");
  const label = arr.filter((s) => s.indexOf("athlete-") !== -1);
  return label[0].split("-")[1];
};

const getAthleteRank = (athlete) => {
  const $ = cheerio.load(athlete);
  const selector = "td.athlete-rank";
  const rank = $(selector).text();
  return rank;
};

const getAthleteProfile = (athlete) => {
  const item = {};

  const $ = cheerio.load(athlete);

  let selector = "div.avatar-image > a";
  item.image = $(selector).attr("data-img-src");

  item.url = $(selector).attr("href");

  selector = "div.avatar-text > div.avatar-text-primary";
  item.name = $(selector).text();

  selector =
    "div.avatar-text > div.avatar-text-secondary > span.athlete-country-flag";
  item.flag = $(selector).attr("data-img-src");

  selector =
    "div.avatar-text > div.avatar-text-secondary > span.athlete-country-name";
  item.country = $(selector).text();

  return item;
};

const getAthletePoints = (athlete) => {
  const $ = cheerio.load(athlete);
  const selector = "td.athlete-points";
  const points = $(selector).text().replace(/\D/g, "");
  return points;
};

const getList = async (baseUrl) => {
  try {
    const list = await axios.get(baseUrl).then(
      (response) => {
        if (response.status === 200) {
          const html = response.data;
          const $ = cheerio.load(html);
          const surferList = [];
          let makingTheCut = true;

          const selector = `${baseSelector} > div > div > div > div > div.table-outer-wrap > div > table > tbody > tr`;

          $(selector).each(async function (i, elem) {
            const itemClass = $(elem).attr("class");
            if (itemClass.indexOf("cut-off-row") !== -1) {
              makingTheCut = false;
            } else {
              const surfer = {};
              surfer.id = getAthleteId(itemClass);
              surfer.rank = getAthleteRank(elem);
              surfer.points = getAthletePoints(elem);
              surfer.makingTheCut = makingTheCut;
              const profile = getAthleteProfile(elem);
              // profile = await getIndividual(profile);
              surferList.push(Object.assign(surfer, profile));
            }
          });

          return surferList;
        }
      },
      (err) => console.log(err)
    );

    return list;
  } catch (err) {
    console.error(err);
  }
};

const getDetails = (data, url) => {
  const profile = { url: url };
  const html = data;
  const $ = cheerio.load(html);
  let selector;
  const ulSelector = `${baseSelector} > div.content-rail > div > div.new-athlete-bio-stats > ul`;

  // get height in cm,feet/inches
  selector = `${ulSelector} > li:nth-child(4) > div.value > span.metric`;
  profile.heightMetric = parseInt($(selector).text(), 10);
  selector = `${ulSelector} > li:nth-child(4) > div.value > span.imperial`;
  let imperial = $(selector).text().trim();
  if (imperial) {
    const arr = imperial.split(",");
    profile.heightImperial = [parseInt(arr[0]), parseInt(arr[1])];
  } else {
    profile.heightImperial = imperial; // parseInt($(selector).text(), 10);
  }

  // get weight in metric
  selector = `${ulSelector} > li:nth-child(5) > div.value > span.metric`;
  profile.weightMetric = parseInt($(selector).text(), 10);
  selector = `${ulSelector} > li:nth-child(5) > div.value > span.imperial`;
  profile.weightImperial = parseInt($(selector).text(), 10);

  // get stance
  selector = `${ulSelector} > li:nth-child(1) > div.value`;
  profile.stance = $(selector).text();

  // get birthday
  selector = `${ulSelector} > li:nth-child(3) > div.value > span.metric`;
  profile.birthday = $(selector).text();

  // get hometown
  selector = `${ulSelector} > li:nth-child(6) > div.value`;
  profile.hometown = $(selector).text();

  return profile;
};

const drive = async () => {
  // get date
  const now = new Date();
  const dataFile = `./surfers-${now.toISOString()}.js`;

  // get men/women lists
  console.log("g3t surfers ...");
  let men = await getList(urls[0].baseUrl);
  let women = await getList(urls[1].baseUrl);
  console.log("... g0t surfers");

  console.log("... get surfer details ... under C");

  const lists = {
    men: men,
    women: women,
  };

  const promiseUrlList = [];
  men.forEach((s) => {
    promiseUrlList.push(s.url);
  });
  women.forEach((s) => {
    promiseUrlList.push(s.url);
  });

  function getAllData(promiseUrlList) {
    return Promise.all(promiseUrlList.map(fetchData));
  }

  function fetchData(url) {
    console.log("fetchData", url);
    return axios
      .get(url)
      .then(function (response) {
        const r = {
          success: true,
          data: getDetails(response.data, url),
        };
        return r;
      })
      .catch(function (error) {
        return { success: false, data: { url: url } };
      });
  }

  console.log("getAllData");
  getAllData(promiseUrlList)
    .then((resp) => {
      resp.forEach((detail) => {
        const detailUrl = detail.data.url;
        let found = lists.men.find((i) => i.url === detailUrl);
        if (found) {
          Object.assign(found, detail.data);
        } else {
          found = lists.women.find((i) => i.url === detailUrl);
          if (found) {
            Object.assign(found, detail.data);
          }
        }
      });
      const surfers =
        "export const surfers = " + JSON.stringify(lists, null, "\t") + ";";
      fs.writeFileSync(dataFile, surfers);
    })
    .catch((e) => {
      console.log("ERROR", e);
    });
};

drive();
