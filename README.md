# allevios.io Open Source IoT Platform - Server

## Requirements

* Node.js
* MongoDB

## Features
* Built using JavaScript, AngularJS, Node.js
* REST API
* Web-based management interface

## Documentation

### Installation

#### Prerequisites

This guide assumes a working Node.js + MongoDB installation (on macOS, Linux or Windows). 

#### Install Dependencies

We need to install additional software before we can install allevios.io-server.

##### Node.js

[Node.js](https://nodejs.org/)

##### Git (with command line tools)

Linux or Mac users should probably have an existing git installation already.

[Git on Windows](https://git-scm.com/download/win)

#### MongoDB

[Official Documentation](https://docs.mongodb.com/manual/installation/)

#### Install allevios.io-server

1. Pull needed files from GitHub

```sh
$ git clone https://github.com/allevios/allevios.io-server.gi allevios.io-server
```

2. Change to the allevios.io-server folder and install additional dependencies with:

```sh
$ npm install -g bower grunt
$ npm install; bower install
```

#### Create MongoDB Database and initialize it

We use REST to initializing the database. So we need first to run allevios.io-server.

Terminal 1
Run allevios.io-server
```sh
$ node .
```

Terminal 2
Run seeding script
```sh
$ node seed/setup.js
```

Then navigate to https://localhost:9000 in your browser.

Default Username: admin@admin.com
Default Password: admin

## Run allevios.io-server 

```sh
$ allevios.io-server -l (warn and error logging)
$ allevios.io-server -L (full logging)
$ allevios.io-server -f (path to log)
$ allevios.io-server -h (starts http only)
```

### Production mode (https only)

To create a SSL certificate (only for testing), you can use our script:
```sh
$ cd ./server/ssl
$ sh ssl-keygen.sh
```


```sh
$ node .
```

### Debug mode (http only)
```sh
$ DEBUG=loopback node . -h
```

### Test server
```sh
$ grunt test
```

## Strongloop API Explorer

```
http(s)://127.0.0.1:9000/explorer
```

## Use Strongloop ARC to view and edit models

```sh
$ slc arc
```


## Contribution
All contributors are welcome!

For information on how contribute to allevios.io, please join our [slack channel](https://www.allevios.com/wp-login.php?action=slack-invitation).


## License

 Copyright 2015, 2016 Daniel Schlager, Christian Kawalar

 This file is part of allevios.io

 allevios.io is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 allevios.io is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with allevios.io.  If not, see <http://www.gnu.org/licenses/>.

