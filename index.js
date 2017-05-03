// Embedding Horizon server according to http://horizon.io/docs/embed/
// https://github.com/tailsu/horizon-custom-login
// https://github.com/auth0/node-jsonwebtoken
// https://github.com/zeit/ms

const express = require('express');
const colors = require('colors');
const app = express();

// Loading all server modules ...
require('./settings')(app);              console.log('[Kiliman]' . magenta, 'loading settings...' . cyan);
require('./models')(app);                console.log('[Kiliman]' . magenta, 'loading models...' . cyan);
require('./middlewares')(app);           console.log('[Kiliman]' . magenta, 'loading middlewares...' . cyan);
require('./actions')(app);               console.log('[Kiliman]' . magenta, 'loading actions..' . cyan);
require('./routes')(app);                console.log('[Kiliman]' . magenta, 'loading routes...' . cyan);
require('./helpers')(app);               console.log('[Kiliman]' . magenta, 'loading helpers...' . cyan);
require('./boot')(app);                  console.log('[Kiliman]' . magenta, 'loading initial boot scripts...' . cyan);

console.log('[Kiliman]' . magenta, 'Listening on port' . cyan, `${app.hzConfig.port}...` . red);
const httpd = app.listen(app.hzConfig.port);

require('./horizon')(app, httpd);         console.log('loading horizon...');
