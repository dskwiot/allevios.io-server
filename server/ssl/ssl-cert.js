/**
 *  * https://github.com/strongloop/loopback-gateway/blob/master/server/private/ssl_cert.js
 *   **/
/* eslint no-sync:false */

'use strict';

const crypto = require('crypto');
const tls = require('tls');
const fs = require('fs');
const path = require('path');

exports.privateKey = fs.readFileSync(path.join(__dirname, 'privatekey.pem')).toString();
exports.certificate = fs.readFileSync(path.join(__dirname, 'certificate.pem')).toString();

let credentials;

if (tls.createSecureContext) {
  credentials = tls.createSecureContext({
    key: exports.privateKey,
    cert: exports.certificate,
  });
} else {
  credentials = crypto.createCredentials({
    key: exports.privateKey,
    cert: exports.certificate,
  });
}

exports.credentials = credentials;
