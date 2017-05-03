//////////////
// Settings //
//////////////
const toml = require('toml');
const path = require('path');
const fs = require('fs');

module.exports = (app) => {
    const env = process.env.NODE_ENV || 'dev';
    const hzConfig = '../.hz/config-' + env + '.toml';
    const config = '../config/config-' + env + '.json';

    app.hzConfig = toml.parse(fs.readFileSync(path.join(__dirname, hzConfig)));
    app.settings = require(path.join(__dirname, config));
};