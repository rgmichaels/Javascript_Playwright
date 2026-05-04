const fs = require('fs-extra');

const paths = ['reports', 'test-results', 'artifacts', 'downloads'];

for (const path of paths) {
  fs.removeSync(path);
}

fs.ensureDirSync('reports/cucumber');
fs.ensureDirSync('reports/html');
fs.ensureDirSync('test-results/screenshots');
fs.ensureDirSync('test-results/traces');
fs.ensureDirSync('test-results/html');
fs.ensureDirSync('test-results/console');
fs.ensureDirSync('downloads');
