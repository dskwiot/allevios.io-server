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
    .controller('ConnectionCtrl', function ($scope, $translate, $modal, Auth, Connection, Site, Agent) {
        $scope.connections = Connection.query();
        $scope.sites = Site.query();
        $scope.agents = Agent.query();

        $scope.form = {};
        $scope.isEdit = false;
        $scope.isNew = false;

        $scope.edit = function (connection) {

            var modalConnectionInstance = $modal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'newConnectionModalTemplate.html',
                controller: 'AssistantConnectionModalCtrl',
                scope: $scope,
                size: 600,
                resolve: {
                    connection: function () {
                        return connection;
                    }
                }
            });

            modalConnectionInstance.result.then(function (form) {
                $scope.save(form);
            }, function () {

            });

        };

        $scope.add = function (connection) {
            var modalConnectionInstance = $modal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'newConnectionModalTemplate.html',
                controller: 'AssistantConnectionModalCtrl',
                scope: $scope,
                size: 600,
                resolve: {
                    connection: function () {
                        return undefined;
                    }
                }
            });

            modalConnectionInstance.result.then(function (form) {
                $scope.save(form);
            }, function () {

            });
        };

        $scope.save = function (form) {
            if (form.isEdit == true) {
                Connection.update({ id: form.id }, {
                    id: form.id,
                    name: form.name,
                    info: form.info,
                    adaptor: form.adaptor,
                    uuid: form.uuid,
                    // accessToken: form.accessToken,
                    mod: form.mod,
                    host: form.host,
                    port: form.port,
                    username: form.username,
                    password: form.password,
                    /* f1: form.f1,
                    f2: form.f2,
                    f3: form.f3,
                    agent: form.agent,
                    site: form.site, */
                    active: form.active
                }, function (connection) {
                    $scope.connections = Connection.query();
                });
            } else {
                Connection.save({
                    name: form.name,
                    info: form.info,
                    adaptor: form.adaptor,
                    uuid: form.uuid,
                    // accessToken: form.accessToken,
                    mod: form.mod,
                    host: form.host,
                    port: form.port,
                    username: form.username,
                    password: form.password,
                    /* f1: form.f1,
                    f2: form.f2,
                    f3: form.f3,
                    agent: form.agent,
                    site: form.site, */
                    active: form.active
                }, function (connection) {
                    $scope.connections = Connection.query();
                });
            };
        };

        $scope.delete = function (connection) {
            Connection.remove({
                id: connection.id
            });
            angular.forEach($scope.connections, function (c, i) {
                if (c === connection) {
                    $scope.connections.splice(i, 1);
                }
            });

            $scope.isEdit = false;
            $scope.isNew = false;
        };

    });

angular.module('alleviosServerApp').controller('AssistantConnectionModalCtrl', function ($scope, $modalInstance, $controller, Agent, Site, connection) {

    $controller('ConnectionCtrl', {
        $scope: $scope
    });

    $scope.connection = connection;
   // $scope.agents = Agent.query();
    // $scope.sites = Site.query();

    var update = function () {
        if (connection) {

            $scope.form.id = connection.id;
            $scope.form.name = connection.name;
            $scope.form.info = connection.info;
            $scope.form.adaptor = connection.adaptor;

            $scope.form.uuid = connection.uuid;
       //     $scope.form.accessToken = connection.accessToken;
            $scope.form.mod = connection.mod;
            $scope.form.host = connection.host;

            $scope.form.port = connection.port;

            $scope.form.username = connection.username;
            $scope.form.password = connection.password;

         /*   $scope.form.f1 = connection.f1;
            $scope.form.f2 = connection.f2;
            $scope.form.f3 = connection.f3;

            $scope.form.agent = connection.agent;

            $scope.form.site = connection.site;
            $scope.form.active = connection.active;
*/
            $scope.form.isEdit = true;

        } else {
           /* if ($scope.sites[0]) {
                $scope.form.site = $scope.sites[0]._id;
            }

            if ($scope.agents[0]) {
                $scope.form.agent = $scope.agents[0]._id;
            } */

            $scope.form.active = true;
        }
        $scope.$apply();
    };

    setTimeout(update, 500);

    $scope.ok = function (form) {
        $modalInstance.close(form);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

});
