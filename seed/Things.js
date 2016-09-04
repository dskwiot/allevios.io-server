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

var sites;
var thing1;

var find = {
  'filter' :{
    'where' : {
      'name' : 'Home'
    }
  }
};

var seed = function() {

  rClient('/api/Sites/findOne', 'GET', find, '0.0.0.0', 9000, function (result) {
    console.log('Search for entry: ' + JSON.stringify(find));
    sites = result;
    if (result) {
      console.log('Found Site: ');
      console.log(result);
      thing1 = {
        'id': uuid.v4(),
        'name': 'EIB Gateway 1',
        'site_id': sites.id,
        'info': 'Test EIB Gateway',
        'url': 'url',
        'icon': 'icon',
        '_thingtype': {
          'id': uuid.v4(),
          'name': 'EIB/KNX',
          'info': 'European Installation Bus',
          'icon': 'KNX',
          'url': 'http://dev.allevios.com',
          'cat_name': 'Automation',
          'cat_info': 'Home and Building Automation',
          'cat_icon': 'fa fa-building-o',
          'cat_url': 'https://dev.allevios.com',
          'dptypes': [
            {
              'id': '17302aa5-dd40-49bb-b5ae-ac1c29dbf7ba',
              'name': 'eib',
              'info': 'allevios.io-eib Driver',
              'cmd': [
                {
                  'name': 'turnOn',
                  'info': '{{AUTOMATION.THINGTYPE.EIB.turnon}}',
                  'icon': 'icon',
                  'value': 1,
                  'type': 'set,get',
                  'dpType': '1Bit',
                  'usableIn': '#0#'
                },
                {
                  'name': 'turnOff',
                  'info': '{{AUTOMATION.THINGTYPE.EIB.turnoff}}',
                  'icon': 'icon',
                  'value': 0,
                  'type': 'set,get',
                  'dpType': '1Bit',
                  'usableIn': '#0#'
                }],
              'model': 'EIB',
              '_driver': {
                'id': uuid.v4(),
                'name': 'eib-driver',
                'info': 'allevios.io-eib Driver',
                'framework': 'al'
              }

            }]
        },
        '_datapoints': [{
          'id': '17302aa5-dd40-49bb-b5ae-ac1c29dbf7ba',
          'name': 'eib',
          'info': 'allevios.io-eib Driver',
          'cmd': [
            {
              'name': 'turnOn',
              'info': '{{AUTOMATION.THINGTYPE.EIB.turnon}}',
              'icon': 'icon',
              'value': 1,
              'type': 'set,get',
              'dpType': '1Bit',
              'usableIn': '#0#'
            },
            {
              'name': 'turnOff',
              'info': '{{AUTOMATION.THINGTYPE.EIB.turnoff}}',
              'icon': 'icon',
              'value': 0,
              'type': 'set,get',
              'dpType': '1Bit',
              'usableIn': '#0#'
            }],
          'model': 'EIB',
          'io': '0.0.1',
          '_driver': {
            'id': uuid.v4(),
            'name': 'eib-driver',
            'info': 'allevios.io-eib Driver',
            'framework': 'al'
          }

        }],
        '_connections': [{
          'id': uuid.v4(),
          'name': 'EIB Gateway1',
          'info': 'EIB Test Gateway',
          'adaptor': 'al_eib',
          'host': 'dhcp',
          'fallbackId': 0,
          'useAgent': false
        }]
      };

      rClient('/api/Things', 'POST', thing1, '0.0.0.0', 9000, function (result) {
        if (result) {
          console.log(result);
        }
      });
    } else {
      console.error('Seeding failed!');
    }
  });
};

module.exports = seed;




