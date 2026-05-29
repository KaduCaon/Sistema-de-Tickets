const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'db.json');

function readDatabase() {
  const data = fs.readFileSync(dbPath, 'utf-8');
  return JSON.parse(data);
}

function writeDatabase(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

function getNextId(items) {
  if (!items.length) return 1;
  return Math.max(...items.map((item) => Number(item.id))) + 1;
}

module.exports = {
  readDatabase,
  writeDatabase,
  getNextId
};
