const axios = require('axios');
const cheerio = require('cheerio');
const urls = [
  {
    baseUrl: 'https://www.worldsurfleague.com/athletes/tour/mct?year=2023',
    gender: 'men'
  },
  {
    baseUrl: 'https://www.worldsurfleague.com/athletes/tour/wct?regionId=1&amp;seasonNumber=1&amp;year=2023',
    gender: 'women'
  }
];

const fs = require('fs');

const getAthleteId = ( str ) => {
  const arr = str.split(' ');
  const label = arr.filter(s=>s.indexOf('athlete-') !== -1);
  return label[0].split('-')[1];
};

const getAthleteRank = ( athlete ) => {
  const $ = cheerio.load(athlete);
  const selector = "td.athlete-rank";
  const rank = $(selector).text();
  return rank;
};

const getAthleteProfile = ( athlete ) => {
  const item = {};

  const $ = cheerio.load(athlete);

  let selector = "div.avatar-image > a";
  item.image = $(selector).attr('data-img-src');
  item.url = $(selector).attr('href');

  selector = "div.avatar-text > div.avatar-text-primary";
  item.name = $(selector).text();

  selector = "div.avatar-text > div.avatar-text-secondary > span.athlete-country-flag";
  item.flag = $(selector).attr('data-img-src');

  selector = "div.avatar-text > div.avatar-text-secondary > span.athlete-country-name";
  item.country = $(selector).text();

  return item;
};

const getAthletePoints = ( athlete ) => {
  const $ = cheerio.load(athlete);
  const selector = "td.athlete-points";
  const points = $(selector).text().replace(/\D/g, "");
  return points;
};

const getList = async (baseUrl) => {

  try {

    const list = await axios.get( baseUrl )
      .then((response) => {
          if(response.status === 200) {

              const html = response.data;
              const $ = cheerio.load(html);
              const surferList = [];
              let makingTheCut = true;

              const selector = "#primary > div > div > div.new-page-body > div > div > div > div > div > div.table-outer-wrap > div > table > tbody > tr";
              $(selector).each(function (i,elem) {

                const itemClass = $(elem).attr('class');
                if(itemClass.indexOf('cut-off-row') !== -1){
                  makingTheCut = false;
                } else {
                  const surfer = {};
                  surfer.id = getAthleteId(itemClass);
                  surfer.rank = getAthleteRank(elem);
                  surfer.points = getAthletePoints(elem);
                  surfer.makingTheCut = makingTheCut;
                  const profile = getAthleteProfile(elem);
                  surferList.push(Object.assign(surfer, profile));
                }

              });

              return surferList;

          }
      }, (err) => console.log(err) );

    return list;

  } catch (err) { console.error(err); }

};

const drive = async () => {

  const lists = {
    men: await getList(urls[0].baseUrl),
    women: await getList(urls[1].baseUrl)
  };

  const now = new Date();
  const dataFile = `./surfers-${now.toISOString()}.js`
  const surfers = "export const surfers = " + JSON.stringify(lists,null,'\t') + ";";

  try {
    fs.writeFileSync(dataFile,surfers);
    // file written successfully
  } catch (err) {
    console.error(err);
  }

  process.exit();

};

drive();

