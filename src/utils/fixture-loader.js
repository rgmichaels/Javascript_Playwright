const path = require('path');
const fs = require('fs-extra');

function loadFixture(name) {
  const fixturePath = path.join(__dirname, '..', 'fixtures', name);
  return fs.readJsonSync(fixturePath);
}

module.exports = {
  loadFixture
};
