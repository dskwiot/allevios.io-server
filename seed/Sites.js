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

var rClient = require('./restClient.js');
var uuid = require('node-uuid');

var uuidSite1 = uuid.v4();
var uuidSite2 = uuid.v4();
var uuidSite3 = uuid.v4();

var site1 = {
  "id": uuidSite1,
  "depth" : 0,
  "next" : uuidSite2,
  "prev" : uuidSite3,
  "name": "Home",
  "info": "One Way",
  "geoloc": "long213,lat213",
  "blueprint": "nope",
  "blueprint_x": 1,
  "blueprint_y": 2,
  "blueprint_z": 3,
};
var site2 = {
  "id": uuidSite2,
  "depth" : 1,
  "next" : uuidSite3,
  "prev" : uuidSite1,
  "name": "Base",
  "info": "",
  "geoloc": "long213,lat213",
  "blueprint": "nope",
  "blueprint_x": 1,
  "blueprint_y": 2,
  "blueprint_z": 3,
};

var site3={
  "id": uuidSite3,
  "depth" : 2,
  "next" : uuidSite1,
  "prev" : uuidSite2,
  "name": "Homeoffice",
  "info": "That's your homeoffice",
  "geoloc": "long213,lat213",
  "blueprint": "nope",
  "blueprint_x": 1,
  "blueprint_y": 2,
  "blueprint_z": 3,
};

var seed = function() {
  rClient('/api/Sites', 'POST', site1, '0.0.0.0', 9000, function (result) {
    if (result) {
      console.log(result);
    }
  });

  rClient('/api/Sites', 'POST', site2, '0.0.0.0', 9000, function (result) {
    if (result) {
      console.log(result);
    }
  });

  rClient('/api/Sites', 'POST', site3, '0.0.0.0', 9000, function (result) {
    if (result) {
      console.log(result);
    }
  });
};

module.exports = seed;
