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
//Writing pubsub module for socket.io
module.exports = {
  //Publishing a event..
  publish: function(socket, options) {
    if (options) {
      var collectionName = options.collectionName;
      var method         = options.method;
      var data           = options.data;
      var modelId        = options.modelId;
      var name;
      if (method === 'POST') {
        name = '/' + collectionName + '/' + method;
        socket.emit(name, data);
      } else {
        name = '/' + collectionName + '/' + modelId + '/' + method;
        socket.emit(name, data);
      }
    }else {
      throw 'Error: Option must be an object type';
    }
  }, //End Publish..

  isEmpty: function(obj) {
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    // null and undefined are "empty"
    if (obj === null) return true;
    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;
    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (var key in obj) {
      if (this.hasOwnProperty.call(obj, key)) return false;
    }
    return true;
  } //isEmpty function..
};
