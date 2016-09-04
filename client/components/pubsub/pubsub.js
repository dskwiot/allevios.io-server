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
angular.module('alleviosServerApp')
    .factory('PubSub', function(socket) {
      var container = [];
      return {
        subscribe: function(options, callback) {
          if (options) {
            var collectionName = options.collectionName;
            var modelId = options.modelId;
            var method = options.method;
            if (method === 'POST') {
              var name = '/' + collectionName + '/' + method;
              socket.on(name, callback);
              console.log(name);
            } else {
              var name = '/' + collectionName + '/' + modelId + '/' + method;
              socket.on(name, callback);
            }
            //Push the container..
            this.pushContainer(name);
          } else {
            throw 'Error: Option must be an object';
          }
        }, //end subscribe

        pushContainer: function(subscriptionName) {
          container.push(subscriptionName);
        },

        //Unsubscribe all containers..
        unSubscribeAll: function() {
          for (var i = 0; i < container.length; i++) {
            socket.removeAllListeners(container[i]);
          }
          //Now reset the container..
          container = [];
        },

      };
    });
