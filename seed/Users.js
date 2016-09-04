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

var user1 = {
  "username": "admin@admin.com",
  "email": "admin@admin.com",
  "password": "admin"
};

var seed = function() {
  rClient('/api/users','POST',user1,'0.0.0.0',9000,function(result){
    if(result){
      console.log(result);
    }
  });
};

module.exports = seed;


