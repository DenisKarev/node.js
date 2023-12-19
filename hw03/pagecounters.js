const fs = require('node:fs');

const dbFilePath = './pages.db.json';
let counters = {};

module.exports = function workwcounters(path) {
  if (path) {
    try {
      let file = fs.readFileSync(dbFilePath);
      if (!file.length) {
        console.log('dbFile -> empty');
        counters = {};
        refrechCounters(path);
      } else {
        counters = { ...JSON.parse(file) };
        refrechCounters(path);
        console.log(counters);
      }
    } catch (error) {
      console.log(`no dbFile !  ${error?.code}`);
      counters = {};
      refrechCounters(path);
    }
  } else {
    throw new Error('some shit happened )');
  }
  return counters[path];
};

function refrechCounters(path) {
  if (!counters[path]) {
    counters[path] = 1;
  } else {
    counters[path] += 1;
  }
  try {
    fs.writeFileSync(dbFilePath, JSON.stringify(counters, null, 2));
  } catch (error) {
    console.log('some shit happened on write');
    console.log(error);
  }
}
