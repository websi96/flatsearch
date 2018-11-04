const Crawler = require('./lib/crawler');
const CronJob = require('cron').CronJob;
const FlatChecker = require('./lib/flatchecker');
const User = require('./lib/user');
const flatChecker = new FlatChecker();
const logErr = require('./lib/logger').logErr;

if (process.env.NODE_ENV == 'dev') {
  const server = require('./tests/www');
  server.listen(process.env.PORT || 8080);
  flatChecker.initOutput = true;
}


const name = 'Thomas';
const email = 'kontakt@weber-thomas.at';
const filter = [1020, 1030, 1200, 1210, 1220];

const thomas = new User(name, email, filter);



let cronTime = '0 */5 8-19 * * *';
startCron(cronTime);





async function startCrawl(callback) {
  const crawler = new Crawler();
  await crawler.crawl();
  let newFlats = await flatChecker.compare(crawler.flats);

  if (newFlats.length > 0) {
    thomas.alert(newFlats);
  }

  if (process.env.NODE_ENV == 'dev') {
    return callback();
  }

}

function startCron(cronTime) {
  if (process.env.NODE_ENV == 'dev') {
    setTimeout(() => {
      startCrawl(() => {
        startCron();
      }).catch((err) => {
        logErr(err);
      });
    }, 500);
  } else {
    const job = new CronJob(cronTime, () => {
      startCrawl();
    }, null, null, "Europe/Amsterdam");
    job.start();
  }
}



/*
const user = new User(name, email, filter);

user.alert(newFlats.filter(this.filter));
*/