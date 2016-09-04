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
    .controller('ClientCtrl', function ($scope, $translate, $modal, Auth, Client) {
        $scope.clients = Client.query();

        $scope.form = {};

        $scope.edit = function (client) {
            var modalClientInstance = $modal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'newClientModalTemplate.html',
                controller: 'AssistantClientModalCtrl',
                size: 400,
                resolve: {
                    client: function () {
                        return client;
                    }
                }
            });

            modalClientInstance.result.then(function (form) {
                $scope.save(form);
            }, function () {

            });
        };

        $scope.add = function () {
            var modalClientInstance = $modal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'newClientModalTemplate.html',
                controller: 'AssistantClientModalCtrl',
                size: 400,
                resolve: {
                    client: function () {
                        return undefined;
                    }
                }
            });

            modalClientInstance.result.then(function (form) {
                $scope.save(form);
            }, function () {

            });
        };

        $scope.save = function (form) {
            if (form.isEdit == true) {
                Client.update({
                    _id: form.id,
                    name: form.name,
                    info: form.info,
                    active: form.active
                }, function (client) {
                    $scope.clients = Client.query();
                });
            } else {
                Client.save({
                    name: form.name,
                    info: form.info,
                    active: form.active
                }, function (client) {
                    $scope.clients = Client.query();
                });
            }
        };

        $scope.delete = function (client) {
            Client.remove({
                id: client._id
            });
            angular.forEach($scope.clients, function (c, i) {
                if (c === client) {
                    $scope.clients.splice(i, 1);
                }
            });

        };
    });


angular.module('alleviosServerApp').controller('AssistantClientModalCtrl', function ($scope, $modalInstance, $controller, client) {

    $controller('ClientCtrl', {
        $scope: $scope
    });

    $scope.client = client;

    var update = function () {
        if (client) {

            $scope.form.id = client._id;
            $scope.form.name = client.name;
            $scope.form.info = client.info;
            $scope.form.active = client.active;

            $scope.form.isEdit = true;

        } else {
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
