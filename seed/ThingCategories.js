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

var type1 = {
  'cat_name': 'Automation',
  'cat_info': 'Home and Building Automation',
  'cat_icon': 'fa fa-building-o',
  'cat_url': 'https://dev.allevios.com',
  'name': 'EIB/KNX',
  'info': 'European Installation Bus',
  'icon': 'KNX',
  'url': 'http://dev.allevios.com',
  'id' : uuid.v4(),
  'dptypes' : [{
    'id' : uuid.v4(),
    'name' : 'eib',
    'info' : 'allevios.io-eib Driver',
    'cmd' : [
      {
        'name' : 'turnOn',
        'info' : 'AUTOMATION.THINGTYPE.EIB.turnon',
        'icon' : 'icon',
        'value' : 1,
        'type' : 'set,get',
        'dpType' : '1Bit',
        'usableIn' : '#0#'
      },{
        'name' : 'turnOff',
        'info' : 'AUTOMATION.THINGTYPE.EIB.turnoff',
        'icon' : 'icon',
        'value' : 0,
        'type' : 'set,get',
        'dpType' : '1Bit',
        'usableIn' : '#0#'
      }],
      'model' : 'EIB',
      '_driver' :{
        'id' : uuid.v4(),
        'name' : 'eib-driver',
        'info' : 'allevios.io-eib Driver',
        'framework' : 'al'
      }

  }]
};

var type2 = {
  'cat_name': 'Health',
  'cat_info': 'Health',
  'cat_icon': 'fa fa-heartbeat-o',
  'cat_url': 'https://dev.allevios.com',
  'name': 'Neurosky',
  'info': 'Neurosky',
  'icon': 'Neurosky',
  'url': 'http://dev.allevios.com',
  'id' : uuid.v4()
};

var type3 = {
  'cat_name': 'Robotics',
  'cat_info': 'ROBOTIC.info',
  'cat_icon': 'mega-octicon octicon-hubot',
  'cat_url': 'https://dev.allevios.com',
  'name': 'Bluetooth',
  'info': 'ROBOTIC.THINGTYPE.BLUETOOTH.info',
  'icon': 'Bluetooth',
  'url': 'http://dev.allevios.com',
  'id': uuid.v4()
};

var type4 = {
  'cat_name': 'Robotics',
  'cat_info': 'ROBOTIC.info',
  'cat_icon': 'mega-octicon octicon-hubot',
  'cat_url': 'https://dev.allevios.com',
  'name': 'Crazyflie',
  'info': 'ROBOTIC.THINGTYPE.CRAZYFLIE.info',
  'icon': 'Crazyflie',
  'url': 'http://dev.allevios.com',
  'id': uuid.v4()
};

var type5 =
  {
    'cat_name': 'Robotics',
    'cat_info': 'ROBOTIC.info',
    'cat_icon': 'mega-octicon octicon-hubot',
    'cat_url': 'https://dev.allevios.com',
    'name': 'Digispark',
    'info': 'ROBOTIC.THINGTYPE.DIGISPARK.info',
    'icon': 'Digispark',
    'url': 'http://dev.allevios.com',
    'id': uuid.v4()
  };

  var type6 = {
    'cat_name': 'Robotics',
    'cat_info': 'ROBOTIC.info',
    'cat_icon': 'mega-octicon octicon-hubot',
    'cat_url': 'https://dev.allevios.com',
    'name': 'MiP',
    'info': '{{ROBOTIC.THINGTYPE.MIP.info | translate }}',
    'icon': 'MiP',
    'url': 'http://dev.allevios.com',
    'id': uuid.v4()
  };
  var type7 ={
    'cat_name': 'Robotics',
    'cat_info': 'ROBOTIC.info',
    'cat_icon': 'mega-octicon octicon-hubot',
    'cat_url': 'https://dev.allevios.com',
    'name': 'nest',
    'info': 'ROBOTIC.THINGTYPE.NEST.info',
    'icon': 'nest',
    'url': 'http://dev.allevios.com',
    'id': uuid.v4()
  };
  var type8 = {
    'cat_name': 'Robotics',
    'cat_info': 'ROBOTIC.info',
    'cat_icon': 'mega-octicon octicon-hubot',
    'cat_url': 'https://dev.allevios.com',
    'name': 'PhilipsHue',
    'info': 'ROBOTIC.THINGTYPE.PHILIPSHUE.info',
    'icon': 'PhilipsHue',
    'url': 'http://dev.allevios.com',
    'id': uuid.v4(),
    'dptypes':[{
      'id': uuid.v4(),
      'name' : 'hue-light',
      'info' : 'HUE Bulp Driver',
      'cmd' : [{
        'name' : 'turnOn',
        'info' : 'ROBOTIC.THINGTYPE.PHILIPSHUE.turnon',
        'icon' : 'icon',
        'value' : 1,
        'type' : 'set',
        'usableIn' : '#0#'
      },{
        'name': 'turnOff',
        'info' : 'ROBOTIC.THINGTYPE.PHILIPSHUE.turnoff',
        'usableIn' : '#0#',
        'icon' : 'icon',
        'value' : 0,
        'type' : 'set'
      },{
        'name': 'toggle',
        'info' : 'ROBOTIC.THINGTYPE.PHILIPSHUE.toggle',
        'usableIn' : '#0#',
        'icon' : 'icon',
        'type' : 'set'
      },{
        'name': 'alert',
        'info' : 'ROBOTIC.THINGTYPE.PHILIPSHUE.alert',
        'usableIn' : '#0#',
        'type' : 'set'
      },{
        'name': 'longAlert',
        'info' : 'ROBOTIC.THINGTYPE.PHILIPSHUE.longalert',
        'usableIn' : '#0#',
        'type' : 'set'
      },{
        'name': 'white',
        'info' : 'ROBOTIC.THINGTYPE.PHILIPSHUE.white',
        'usableIn' : '#0#',
        'type' : 'set'
      },{
        'name': 'brightness',
        'info' : 'ROBOTIC.THINGTYPE.PHILIPSHUE.brightness',
        'usableIn' : '#0#',
        'type' : 'set',
        'slider' : {
          'step' : 1,
          'min' : 0,
          'max' : 255
        }
      },{
        'name': 'hsl',
        'info' : 'ROBOTIC.THINGTYPE.PHILIPSHUE.hsl',
        'usableIn' : '#0#',
        'type' : 'set'
      },{
        'name': 'xy',
        'info' : 'ROBOTIC.THINGTYPE.PHILIPSHUE.xy',
        'usableIn' : '#0#',
        'type' : 'set'
      },{
        'name': 'rgb',
        'info' : 'ROBOTIC.THINGTYPE.PHILIPSHUE.xy',
        'usableIn' : '#0#',
        'type' : 'set'
      }],
      'model' : 'Phillips Hue',
      '_driver' :{
        'id' : uuid.v4(),
        'name' : 'hue-light',
        'info' : 'Hue Light Driver',
        'framework' : 'cy'
      }
    },{
      'id': uuid.v4(),
      'name' : 'hue-bridge',
      'info' : 'HUE Bulp Bridge',
      'cmd' : [{
        'name' : 'init',
        'info' : 'ROBOTIC.THINGTYPE.PHILIPSHUE.init',
        'usableIn' : '#0#',
        'type' : 'get'
      }],
      'model' : 'Phillips Hue',
      '_driver' :{
        'id' : uuid.v4(),
        'name' : 'hue-bridge',
        'info' : 'Hue Bridge Driver',
        'framework' : 'cy'
      }
    }]
  };
  var type9 ={
    'cat_name': 'Robotics',
    'cat_info': 'ROBOTIC.info',
    'cat_icon': 'mega-octicon octicon-hubot',
    'cat_url': 'https://dev.allevios.com',
    'name': 'Pinoccio',
    'info': 'ROBOTIC.THINGTYPE.PINOCCIO.info',
    'icon': 'Pinoccio',
    'url': 'http://dev.allevios.com',
    'id': uuid.v4()
  };

  var type10 = {
    'cat_name': 'Robotics',
    'cat_info': 'ROBOTIC.info',
    'cat_icon': 'mega-octicon octicon-hubot',
    'cat_url': 'https://dev.allevios.com',
    'name': 'Rapiro',
    'info': 'ROBOTIC.THINGTYPE.RAPIRO.info',
    'icon': 'Rapiro',
    'url': 'http://dev.allevios.com',
    'id': uuid.v4()
  };
  var type11 ={
    'cat_name': 'Robotics',
    'cat_info': 'ROBOTIC.info',
    'cat_icon': 'mega-octicon octicon-hubot',
    'cat_url': 'https://dev.allevios.com',
    'name': 'Sphero',
    'info': 'ROBOTIC.THINGTYPE.SPHERO.info',
    'icon': 'Sphero',
    'url': 'http://dev.allevios.com',
    'id': uuid.v4()
  };
  var type12 ={
    'cat_name': 'Robotics',
    'cat_info': 'ROBOTIC.info',
    'cat_icon': 'mega-octicon octicon-hubot',
    'cat_url': 'https://dev.allevios.com',
    'name': 'Sphero Olli',
    'info': 'ROBOTIC.THINGTYPE.SPHEROOLLI.info',
    'icon': 'SpheroOlli',
    'url': 'http://dev.allevios.com',
    'id': uuid.v4()
  };
  var type13 ={
    'cat_name': 'Robotics',
    'cat_info': 'ROBOTIC.info',
    'cat_icon': 'mega-octicon octicon-hubot',
    'cat_url': 'https://dev.allevios.com',
    'name': 'WICED',
    'info': 'ROBOTIC.THINGTYPE.WICED.info',
    'icon': 'WICED',
    'url': 'http://dev.allevios.com',
    'id': uuid.v4()
  };
  var type14={
    'cat_name': 'Robotics',
    'cat_info': 'ROBOTIC.info',
    'cat_icon': 'mega-octicon octicon-hubot',
    'cat_url': 'https://dev.allevios.com',
    'name': 'Arduino',
    'info': 'ROBOTIC.THINGTYPE.ARDUINO.info',
    'icon': 'Arduino',
    'url': 'http://dev.allevios.com',
    'id': uuid.v4()
  };
  var type15 ={
    'cat_name': 'Robotics',
    'cat_info': 'ROBOTIC.info',
    'cat_icon': 'mega-octicon octicon-hubot',
    'cat_url': 'https://dev.allevios.com',
    'name': 'Arduino Yun',
    'info': 'ROBOTIC.THINGTYPE.ARDUINOYUN.info',
    'icon': 'ArduinoYun',
    'url': 'http://dev.allevios.com',
    'id': uuid.v4()
  };
  var type16={
    'cat_name': 'Robotics',
    'cat_info': 'ROBOTIC.info',
    'cat_icon': 'mega-octicon octicon-hubot',
    'cat_url': 'https://dev.allevios.com',
    'name': 'Raspberry',
    'info': 'ROBOTIC.THINGTYPE.RASPBERRY.info',
    'icon': 'Raspberry',
    'url': 'http://dev.allevios.com',
    'id': uuid.v4()
  };


  var seed = function() {
    rClient('/api/ThingTypes', 'POST', type1, '0.0.0.0', 9000, function (result) {
      if (result) {
        console.log(result);
      }
    });

    rClient('/api/ThingTypes', 'POST', type2, '0.0.0.0', 9000, function (result) {
      if (result) {
        console.log(result);
      }
    });

    rClient('/api/ThingTypes', 'POST', type3, '0.0.0.0', 9000, function (result) {
      if (result) {
        console.log(result);
      }
    });
    rClient('/api/ThingTypes', 'POST', type4, '0.0.0.0', 9000, function (result) {
      if (result) {
        console.log(result);
      }
    });

    rClient('/api/ThingTypes', 'POST', type5, '0.0.0.0', 9000, function (result) {
      if (result) {
        console.log(result);
      }
    });
    rClient('/api/ThingTypes', 'POST', type6, '0.0.0.0', 9000, function (result) {
      if (result) {
        console.log(result);
      }
    });
    rClient('/api/ThingTypes', 'POST', type7, '0.0.0.0', 9000, function (result) {
      if (result) {
        console.log(result);
      }
    });
    rClient('/api/ThingTypes', 'POST', type8, '0.0.0.0', 9000, function (result) {
      if (result) {
        console.log(result);
      }
    });
    rClient('/api/ThingTypes', 'POST', type9, '0.0.0.0', 9000, function (result) {
      if (result) {
        console.log(result);
      }
    });
    rClient('/api/ThingTypes', 'POST', type10, '0.0.0.0', 9000, function (result) {
      if (result) {
        console.log(result);
      }
    });
    rClient('/api/ThingTypes', 'POST', type11, '0.0.0.0', 9000, function (result) {
      if (result) {
        console.log(result);
      }
    });
    rClient('/api/ThingTypes', 'POST', type12, '0.0.0.0', 9000, function (result) {
      if (result) {
        console.log(result);
      }
    });
    rClient('/api/ThingTypes', 'POST', type13, '0.0.0.0', 9000, function (result) {
      if (result) {
        console.log(result);
      }
    });
    rClient('/api/ThingTypes', 'POST', type14, '0.0.0.0', 9000, function (result) {
      if (result) {
        console.log(result);
      }
    });
    rClient('/api/ThingTypes', 'POST', type15, '0.0.0.0', 9000, function (result) {
      if (result) {
        console.log(result);
      }
    });
    rClient('/api/ThingTypes', 'POST', type16, '0.0.0.0', 9000, function (result) {
      if (result) {
        console.log(result);
      }
    });
  };

  module.exports = seed;
