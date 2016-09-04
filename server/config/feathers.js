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
 * Feathers configuration
 */

'use strict';

var feathers = require('feathers');
var cors = require('cors');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var compression = require('compression');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var errorHandler = require('errorhandler');
var path = require('path');
var config = require('./environment');
var passport = require('passport');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var mongodb = require('feathers-mongodb');
var hooks = require('feathers-hooks');

var passport = require('passport');
var connectMongo = require('connect-mongo');
var feathersPassport = require('feathers-passport');

module.exports = function (app) {
    var env = app.get('env');

    app.use(cors());
    app.configure(feathers.rest());
    app.configure(feathers.socketio());
    app.configure(hooks());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(compression());
    app.use(methodOverride());
    app.use(cookieParser());

     app.configure(feathersPassport(function(result) {
    // MongoStore needs the session function
    var MongoStore = connectMongo(result.createSession);

    result.secret = 'feathers-rocks';
    result.store = new MongoStore({
      db: 'feathers-demo'
    });

    return result;
  }));

    // Persist sessions with mongoStore
    // We need to enable sessions for passport twitter because its an oauth 1.0 strategy
    app.use(session({
        secret: config.secrets.session,
        resave: true,
        saveUninitialized: true,
         store: new MongoStore({ mongooseConnection: mongoose.connection })
    }));

    if ('production' === env) {
        app.use(favicon(path.join(config.root, 'public', 'favicon.ico')));
        app.use(feathers.static(path.join(config.root, 'public')));
        app.set('appPath', config.root + '/public');
        app.use(morgan('dev'));
    }

    if ('development' === env || 'test' === env) {
        app.use(require('connect-livereload')());
        app.use(feathers.static(path.join(config.root, '.tmp')));
        app.use(feathers.static(path.join(config.root, 'client')));
        app.set('appPath', 'client');
        app.use(morgan('dev'));
        app.use(errorHandler()); // Error handler - has to be last
    }
};
