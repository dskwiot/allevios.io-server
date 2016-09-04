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
    .controller('ThingCtrl', function($scope, $translate, $q, $controller, $uibModal, SETTINGS, uuid4, lodash, Auth, Thing, ThingType, ThingConnection, ThingDatapoint, Project, Connection, Datapoint, DatapointType, Site, ThingTypes, ThingCategories) {

      $scope.animationsEnabled = SETTINGS.animationsEnabled;

      $scope.form = {};
      $scope.dp = {};
      $scope.dp.types = {};
      $scope.dp.datapoints = {};

      $scope.con = {};
      $scope.con.connections = {};

      $scope.thingtypes = [];
      $scope.thingcategories = ThingCategories.query();

      $scope.things = Thing.query();
      $scope.projects = Project.query();
      $scope.connections = {}; //
      $scope.sites = Site.query();

      /**
       * Show Modal to edit an existing Thing
       * @param   {[[Type]]} thing [[Description]]
       * @returns {[[Type]]} [[Description]]
       */
      $scope.edit = function edit(thing) {
        var modalThingInstance = $uibModal.open({
          animation: $scope.animationsEnabled,
          templateUrl: 'newThingModalTemplate.html',
          controller: 'AssistantThingModalCtrl',
          scope: $scope,
          size: 750,
          resolve: {
            thing: function r() {
              return thing;
            },
          },
        });

        modalThingInstance.result.then(function f(form) {
          $scope.save(form).then(function t(thing) {});
        });
      };

      /**
       * Show Modal to add a new Thing
       */
      $scope.add = function() {

        var modalThingInstance = $uibModal.open({
          animation: $scope.animationsEnabled,
          templateUrl: 'newThingModalTemplate.html',
          controller: 'AssistantThingModalCtrl',
          scope: $scope,
          size: 750,
          resolve: {
            thing: function() {
              return undefined;
            },
          },
        });

        modalThingInstance.result.then(function(form) {
          $scope.save(form).then(function(thing) {
            $scope.showDatapoints(thing);
          });
        }, function() {

        });
      };

      $scope.save = function(form) {
        var deferred = $q.defer();

        if (form.isEdit === true) {
          Thing.update({
            id: form.id,
            name: form.name,
            info: form.info,
            site_id: form.site.id,
            url: '',
            icon: '',
          }, function(thing) {
            $scope.form.id = thing.id;
            $scope.things = Thing.query();
            $scope.thing = Thing.get({
              id: thing.id,
            }, function(d) {
              deferred.resolve(d);
            });

          });
        } else {
          Thing.save({
            name: form.name,
            info: form.info,
            url: '',
            icon: '',
            site_id: form.site.id,
          }, function(thing) {
            $scope.form.id = thing.id;
            $scope.things = Thing.query();

            ThingTypes.get({
              id: form.selectedType,
            }, function(type) {
              var json = {};
              $.each(type, function(k, v) {
                if (typeof v !== 'function' && !k.startsWith('$')) {
                  json[k] = v;
                }
              });

              ThingType.save({
                id: thing.id,
              }, json, function(thingtype) {
                $scope.thing = Thing.get({
                  id: thing.id,
                }, function(d) {
                  deferred.resolve(d);
                });
              });
            });

            ThingConnections.get({
              id: form.selectedType,
            }, function(type) {
              var json = {};
              $.each(type, function(k, v) {
                if (typeof v !== 'function' && !k.startsWith('$')) {
                  json[k] = v;
                }
              });

              ThingConnection.save({
                id: thing.id,
              }, json, function(thingtype) {
                $scope.thing = Thing.get({
                  id: thing.id,
                }, function(d) {
                  deferred.resolve(d);
                });
              });
            });

          });
        }

        return deferred.promise;
      };

      $scope.con.save = function(form) {
        var deferred = $q.defer();

        if (form.isEdit === true) {
          ThingConnection.update({
            id: form.thingid,
            fk: form.id,}, {
            name: form.name,
            info: form.info,
            site_id: form.site.id,
            url: '',
            icon: '',
          }, function(thing) {
            $scope.form.id = thing.id;
            $scope.things = Thing.query();
            $scope.thing = Thing.get({
              id: thing.id,
            }, function(d) {
              deferred.resolve(d);
            });

          });
        } else {
        }

        return deferred.promise;
      };

      $scope.delete = function(thing) {
        Thing.remove({
          id: thing.id,
        });
        angular.forEach($scope.things, function(c, i) {
          if (c === thing) {
            $scope.things.splice(i, 1);
          }
        });

      };

      /**
       * Connections
       */

      /**
       * Show Modal to edit connection
       * @param   {[[Type]]} thing [[Description]]
       * @returns {[[Type]]} [[Description]]
       */
      $scope.editConnection = function editConnection(thing) {
        var modalThingInstance = $uibModal.open({
          animation: $scope.animationsEnabled,
          templateUrl: 'newConnectionModalTemplate.html',
          controller: 'AssistantConnectionModalCtrl',
          scope: $scope,
          size: 750,
          resolve: {
            thing: function r() {
              return thing;
            },
          },
        });

        modalThingInstance.result.then(function f(form) {
          $scope.con.save(form).then(function t(thing) {});
        });
      };

      $scope.con.new = function() {
        $scope.form.name = '';
        $scope.form.info = '';
        $scope.form.adaptor = '';
        $scope.form.uuid = '';
        $scope.form.mod = '';
        $scope.form.host = '';
        $scope.form.port = '';
        $scope.form.username = '';
        $scope.form.password = '';
        $scope.form.isEdit = undefined;
      };

      $scope.con.edit = function(connection) {
        $scope.form.id = connection.id;
        $scope.form.name = connection.name;
        $scope.form.info = connection.info;
        $scope.form.adaptor = connection.adaptor;
        $scope.form.uuid = connection.uuid;
        $scope.form.mod = connection.mod;
        $scope.form.host = connection.host;
        $scope.form.port = connection.port;
        $scope.form.username = connection.username;
        $scope.form.password = connection.password;
        $scope.form.isEdit = true;
      };

      $scope.con.save = function(form) {
        if (form.isEdit === true) {
          ThingConnection.update({
            id: form.thingid,
            fk: form.id,
          }, {
            name: form.name,
            info: form.info,
            adaptor: form.adaptor,
            uuid: form.uuid,
            mod: form.mod,
            host: form.host,
            port: form.port,
            username: form.username,
            password: form.password,
          }, function(thing) {
            $scope.things = Thing.query();
          });
        } else {
          ThingConnection.save({
            id: form.thingid,
          }, {
            id: uuid4.generate(),
            name: form.name,
            info: form.info,
            adaptor: form.adaptor,
            uuid: form.uuid,
            mod: form.mod,
            host: form.host,
            port: form.port,
            username: form.username,
            password: form.password,
          }, function(err, thing) {
            console.log(err);
            $scope.things = Thing.query();
          });
        }
      };

      $scope.con.delete = function(connection) {
        ThingConnection.remove({
          id: $scope.form.thingid,
          fk: connection.id,
        });
        angular.forEach($scope.con.connections, function(d, i) {
          if (d === connection) {
            $scope.con.connections.splice(i, 1);
          }
        });
      };

      /**
       * Datapoints
       */

      $scope.showDatapoints = function(thing) {
        var modalDatapointInstance = $uibModal.open({
          animation: $scope.animationsEnabled,
          templateUrl: 'newDatapointModalTemplate.html',
          controller: 'AssistantDatapointModalCtrl',
          scope: $scope,
          size: 400,
          resolve: {
            thing: function() {
              return thing;
            },
          },
        });

        modalDatapointInstance.result.then(function(form) {
          $scope.dp.save(form);
        }, function() {

        });
      };

      $scope.dp.new = function() {
        $scope.form.name = '';
        $scope.form.info = '';
        $scope.form.io = '';
        $scope.form.model = '';
        $scope.form.isEdit = undefined;
        if ($scope.sites[0]) {
          $scope.form.site = $scope.thing.site;
        }
      };

      $scope.dp.edit = function(datapoint) {
        $scope.form.id = datapoint.id;
        $scope.form.name = datapoint.name;
        $scope.form.info = datapoint.info;
        $scope.form.io = datapoint.io;
        $scope.form.type = datapoint.type;
        $scope.form.model = datapoint.model;
        $scope.form.isEdit = true;
      };

      $scope.dp.save = function(form) {
        if (form.isEdit === true) {
          ThingDatapoint.update({
            id: form.thingid,
            fk: form.id,
          }, {
            name: form.name,
            io: form.io,
            info: form.info,
            model: form.model,
          }, function(thing) {
            $scope.things = Thing.query();
          });
        } else {
          ThingDatapoint.save({
            id: form.thingid,
          }, {
            id: uuid4.generate(),
            name: form.name,
            info: form.info,
            io: form.io,
            model: form.model,
          }, function(err, thing) {
            $scope.things = Thing.query();
          });
        }
      };

      $scope.dp.delete = function(datapoint) {
        ThingDatapoint.remove({
          id: $scope.form.thingid,
          fk: datapoint.id,
        });
        angular.forEach($scope.dp.datapoints, function(d, i) {
          if (d === datapoint) {
            $scope.dp.datapoints.splice(i, 1);
          }
        });
      };
    });

angular.module('alleviosServerApp').controller('AssistantThingModalCtrl', function($scope, $uibModalInstance, $controller, $translate, thing, Site, ThingType, ThingTypes, DatapointType) {

  $controller('ThingCtrl', {
    $scope: $scope,
  });

  $scope.thing = thing;
  $scope.sites = Site.query();
  $scope.isThingTypeSelected = false;

  $scope.isCategorySelector = false;
  $scope.isThingTypeSelector = false;
  $scope.isEditThing = false;

  var update = function() {
    if (thing) {

      $scope.showEditThing();

      $scope.form.id = thing.id;
      $scope.form.name = thing.name;
      $scope.form.info = thing.info;
      $scope.form.driver = thing.driver;
      $scope.form.connection = thing.connection_id;
      $scope.form.selectedType = thing.thingtype_id;
      $scope.form.type = thing.thingtype_id;
      $scope.form.site = {id: thing.site_id, };
      $scope.form.isEdit = true;
      $scope.isThingTypeSelected = true;
    } else {
      $scope.showCategorySelection();
      if ($scope.sites[0]) {
        $scope.form.site = {id: $scope.sites[0].id, };
      }
    }
    $scope.$apply();
  };

  setTimeout(update, 500);

  $scope.showCategorySelection = function() {
    $scope.isCategorySelector = true;
    $scope.isThingTypeSelector = false;
    $scope.isEditThing = false;
  };

  $scope.showThingTypeSelection = function() {
    $scope.isThingTypeSelector = true;
    $scope.isCategorySelector = false;
    $scope.isEditThing = false;
  };

  $scope.showEditThing = function() {
    $scope.isEditThing = true;
    $scope.isCategorySelector = false;
    $scope.isThingTypeSelector = false;
  };

  $uibModalInstance.opened.then(function() {});

  $translate('THING.NameofThing').then(function(text) {
    $scope.thingNamePlaceholder = text;
  });

  $scope.setThingNamePlaceholder = function(title) {
    if (title === undefined || title === '') {
      $translate('THING.NameofThing').then(function(text) {
        $scope.thingNamePlaceholder = text;
      });
    } else {
      $translate(['WORD.Name', 'WORD.of', ]).then(function(text) {
        $scope.thingNamePlaceholder = text['WORD.Name'] + ' ' + text['WORD.of'] + ' ' + title;
      });
    }
  };

  $scope.isSelectedCategory = function(category) {
    return $scope.form.selectedCategory === category.id;
  };

  $scope.isSelectedType = function(type) {
    return $scope.form.selectedType === type.id;
  };

  $scope.selectCategory = function(category) {
    $scope.form.selectedCategory = category.id;

    ThingTypes.query({}, function(f) {
        $scope.thingtypes = [];
        angular.forEach(f, function(v, k) {
          if (v.cat_name === category.name) {
            $scope.thingtypes.push(v);
          }
        });
      });

    $scope.showThingTypeSelection();

  };

  $scope.selectType = function(type) {
    $scope.form.selectedType = type.id;
    $scope.setThingNamePlaceholder(type.name);

    $scope.showEditThing();
    setTimeout(function() { $('#InputName').focus(); }, 300);

  };

  $scope.ok = function(form) {
    $uibModalInstance.close(form);
  };

  $scope.cancel = function() {
    $uibModalInstance.dismiss('cancel');
  };

});

angular.module('alleviosServerApp').controller('AssistantConnectionModalCtrl', function($scope, $uibModalInstance, $controller, $translate, thing, Site, ThingType, ThingTypes, DatapointType) {

  $controller('ThingCtrl', {
    $scope: $scope,
  });

  $scope.thing = thing;

  var update = function() {
    if (thing) {
      $scope.con.connections = thing._connections;

      $scope.form.thingid = thing.id;
    } else {
    }
    $scope.$apply();
  };

  setTimeout(update, 500);

  $uibModalInstance.opened.then(function() {});

  $scope.ok = function(form) {
    $uibModalInstance.close(form);
  };

  $scope.cancel = function() {
    $uibModalInstance.dismiss('cancel');
  };

});

angular.module('alleviosServerApp').controller('AssistantDatapointModalCtrl', function($scope, $uibModalInstance, $controller, thing, Thing, ThingType, Datapoint, ThingTypes) {

  $controller('ThingCtrl', {
    $scope: $scope,
  });

  $scope.thing = thing;

  $scope.dp.types = thing._thingtype.dptypes;
  $scope.dp.cmds = [{id: 1, name: 'toggle',}, {id: 2, name: 'onoff',},];

  var update = function() {
    if (thing) {

      // get available datapoint types
      $scope.dp.datapoints = thing._datapoints;

      if ($scope.sites[0]) {
        $scope.form.site = $scope.thing.site;
      }
      $scope.form.thingid = thing.id;
    }
    $scope.$apply();
  };

  setTimeout(update, 500);

  $uibModalInstance.opened.then(function() {

  });

  $scope.ok = function(form) {
    $uibModalInstance.close(form);
  };

  $scope.cancel = function() {
    $uibModalInstance.dismiss('cancel');
  };

});
