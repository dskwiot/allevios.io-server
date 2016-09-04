/*
 * Copyright 2015,2016 Daniel Schlager, Christian Kawalar
 *
 * This file is part of allevios.io
 *
 * allevios.io is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * allevios.io is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with allevios.io.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

/************************** 1. REQUIRE ********************************/

const loopback = require('loopback');
const boot = require('loopback-boot');
const path = require('path');
const helmet = require('helmet');

const app = module.exports = loopback();

// Passport configurators..
const loopbackPassport = require('loopback-component-passport');
const PassportConfigurator = loopbackPassport.PassportConfigurator;
const passportConfigurator = new PassportConfigurator(app);

// Load the necessary modules and middleware for HTTPS
const http = require('http');
const https = require('https');
const sslCert = require('./ssl/ssl-cert');
const httpsOptions = {
  key: sslCert.privateKey,
  cert: sslCert.certificate,
};

const explorer = require('loopback-component-explorer');

const envconfig = require('./config/environment');
const RED = require('node-red'); // Workflow Designer
const log = require('bunyan');
const bodyParser = require('body-parser');
const fs = require('fs');

const pubsub = require('./pubsub'); // todo: move to module

/**
 * Flash messages for passport
 *
 * Setting the failureFlash option to true instructs Passport to flash an
 * error message using the message given by the strategy's verify callback,
 * if any. This is often the best approach, because the verify callback
 * can make the most accurate determination of why authentication failed.
 */
const flash = require('express-flash');

// attempt to build the providers/passport config
var config = {};
try {
  config = require('./providers.json');
} catch (err) {
  console.trace(err);
  throw new Error('providers.json not found'); // fatal
}

// Setup the view engine (jade)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

/************************** 2. SETTINGS ******************************/

const args = process.argv.slice(2);

/* warn and error logging */
if (args.indexOf('-l') > -1) {
  envconfig.logging.level = 1;
}

/* full logging */
if (args.indexOf('-L') > -1) {
  envconfig.logging.level = 2;
}

/* path to log */
if (args.indexOf('-f') > -1) {
  envconfig.logging.path = args[args.indexOf('-f') + 1];
}

/* http for debugging */
if (args.indexOf('-h') > -1) {
  envconfig.httpDebug = true;
}
/************************* 3. INITIALIZE ****************************/

// Set up the /favicon.ico
app.use(loopback.favicon());

// request pre-processing middleware
app.use(loopback.compress());

// helmet
app.use(helmet.frameguard({ action: 'sameorigin' }));

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function error(err) {
  if (err) { throw err; }

  // start the server if `$ node server.js`
  if (require.main === module) {
    app.io = require('socket.io')(app.start(envconfig.httpDebug));
    require('socketio-auth')(app.io, {
    authenticate: function(socket, value, callback) {
      var AccessToken = app.models.AccessToken;
      //get credentials sent by the client
      var token = AccessToken.find({
          where: {
            and: [{userId: value.userId, }, {id: value.id, }, ],
          },
        }, function(err, tokenDetail) {
          console.log(err);
          console.log(tokenDetail);
          if (err) throw err;
          if (tokenDetail.length) {
            callback(null, true);
          } else {
            callback(null, false);
          }
        }); //find function..
    } //authenticate function..
  });

    app.io.on('connection', function(socket) {
      console.log('a user connected');
    socket.on('disconnect', function() {
      console.log('user disconnected');
    });

    /* todo: move to module */
    pubsub.publish(app.io, {
      collectionName: 'ThingStatus',
      data: {},
      method: 'POST',
    });
  });

  }
});

// Set up API explorer
explorer(app);

// Initialise the runtime with a server and settings
RED.init(app, envconfig.nodered);

// Serve the editor UI from /red
app.use(envconfig.nodered.httpAdminRoot, RED.httpAdmin);

// Serve the http nodes UI from /api
app.use(envconfig.nodered.httpNodeRoot, RED.httpNode);

// to support JSON-encoded bodies
app.middleware('parse', bodyParser.json());
// to support URL-encoded bodies
app.middleware('parse', bodyParser.urlencoded({
  extended: true,
}));

// The access token is only available after boot
app.middleware('auth', loopback.token({
  model: app.models.accessToken,
}));

app.middleware('session:before', loopback.cookieParser(app.get('cookieSecret')));
app.middleware('session', loopback.session({
  secret: 'kitty',
  saveUninitialized: true,
  resave: true,
}));

passportConfigurator.init();

// We need flash messages to see passport errors
app.use(flash());

passportConfigurator.setupModels({
  userModel: app.models.user,
  userIdentityModel: app.models.userIdentity,
  userCredentialModel: app.models.userCredential,
});

for (const s in config) {
  const c = config[s];
  c.session = c.session !== false;
  passportConfigurator.configureProvider(s, c);
}
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

app.get('/auth/logout', function logout(req, res) {
  req.logout();
  res.redirect('/');
});

/* ################### START ###################### */

app.start = function start(httpOnly) {

  if (typeof httpOnly === 'undefined') {
    httpOnly = process.env.HTTP;
  }
  var server = null;
  if (!httpOnly) {
    server = https.createServer(httpsOptions, app);
  } else {
    server = http.createServer(app);
  }
  server.listen(app.get('port'), function listen() {
    const baseUrl = (httpOnly ? 'http://' : 'https://') + app.get('host') + ':' + app.get('port');
    app.emit('started', baseUrl);
    console.log('LoopBack server listening @ %s%s', baseUrl, '/');
    if (app.get('loopback-component-explorer')) {
      const explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
  return server;

};

// Start the NodeRed runtime
RED.start();
