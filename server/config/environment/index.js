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

'use strict';

var path = require('path');
var _ = require('lodash');
var pwuid = require('pwuid');

function requiredProcessEnv(name) {
    if (!process.env[name]) {
        throw new Error('You must set the ' + name + ' environment variable');
    }
    return process.env[name];
}

var userDir = pwuid().dir; // get users home directory (in our case, the home of node)

// All configurations will extend these options
// ============================================
var all = {
    env: process.env.NODE_ENV,

    httpDebug: false,

    // Root path of server
    root: path.normalize(__dirname + '/../../..'),

    // Server port
    port: process.env.PORT || 9000,

    // Should we populate the DB with sample data?
    seedDB: false,

    mdnsname: 'allevios.io-server',

    // Secret for session, you will want to change this and make it an environment variable
    secrets: {
        session: 'allevios-server-secret'
    },

    logging: {
        level: 1,
        path: 'allevios_server.log'
    },

    // List of user roles
    userRoles: ['guest', 'user', 'admin'],

    // MongoDB connection options
    mongo: {
        options: {
            db: {
                safe: true
            },
            server: {
                socketOptions: {
                    keepAlive: 1
                }
            },
            replset: {
                socketOptions: {
                    keepAlive: 1
                }
            }
        }
    },

    facebook: {
        clientID: process.env.FACEBOOK_ID || 'id',
        clientSecret: process.env.FACEBOOK_SECRET || 'secret',
        callbackURL: (process.env.DOMAIN || '') + '/auth/facebook/callback'
    },

    twitter: {
        clientID: process.env.TWITTER_ID || 'id',
        clientSecret: process.env.TWITTER_SECRET || 'secret',
        callbackURL: (process.env.DOMAIN || '') + '/auth/twitter/callback'
    },

    google: {
        clientID: process.env.GOOGLE_ID || 'id',
        clientSecret: process.env.GOOGLE_SECRET || 'secret',
        callbackURL: (process.env.DOMAIN || '') + '/auth/google/callback'
    },

    nodered: {
        httpAdminRoot: "/red",
        httpNodeRoot: "/api",
        userDir: userDir + "/nodered/",
        nodesDir: userDir + "/nodered/nodes",
        functionGlobalContext: {},
        paletteCategories: ['subflows', 'allevios', 'input', 'output', 'function', 'social', 'storage', 'analysis', 'advanced'],
        // Configure the logging output
        logging: {
            // Only console logging is currently supported
            console: {
                // Level of logging to be recorded. Options are:
                // fatal - only those errors which make the application unusable should be recorded
                // error - record errors which are deemed fatal for a particular request + fatal errors
                // warn - record problems which are non fatal + errors + fatal errors
                // info - record information about the general running of the application + warn + error + fatal errors
                // debug - record information which is more verbose than info + info + warn + error + fatal errors
                // trace - record very detailed logging + debug + info + warn + error + fatal errors
                level: "trace",

                // Whether or not to include metric events in the log output
                metrics: false
            }
        }
    }
};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
    all,
    require('./' + process.env.NODE_ENV + '.js') || {});
