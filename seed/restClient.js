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

'use static';

var https = require('https');
var querystring = require('querystring');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; //Remove if our cert is official

module.exports = function(path,type,data,host,port,reval){
  var jsonObject;
  if(data){
    if(type === 'POST'){
      jsonObject = JSON.stringify(data);
    }
  }else{
    jsonObject = null;
  }
  var header;

  if(type === 'GET'){
    if(data){
      if(data.hasOwnProperty('filter')){
        path += '?' + querystring.stringify(data);
        path += JSON.stringify(data.filter);
      }
      else{
        path += '?' + querystring.stringify(data);
      }
    }
  }else{
    header = {
      'Content-Type' : 'application/json',
      'Content-Length' : jsonObject.length
    };
  }

  var opt = {
    host: host,
    port: port,
    path: path,
    method: type,
    headers: header
  };

  var request = https.request(opt,function(result){
    request.on('error',function(err){
      console.error(err);
    });

    result.setEncoding('UTF-8');
    var response = '';

    result.on('data',function(data){
      response += data;
      //console.log('data :' +data);
    });
    result.on('error',function(err){
      console.log(err);
    });
    result.on('end',function(){
      if(response){
        //console.log(response);
      }else{
        if(result.statusCode === 200){
          console.log('Request ok (Status 200), but no response');
        }else{
          console.log('Error Status code: ' + result.statusCode);
        }
      }
      var responseObj;
      if(response){
        responseObj = JSON.parse(response);
      }
      reval(responseObj);
    });
    result.on('error',function(error){
      console.log(error);
    });
  });
  if(jsonObject){
    request.write(jsonObject);
  }
  request.end();
};
