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
    .controller('AdminCtrl', function ($scope, $translate, $http, $modal, Auth, User, Usergroup, Client, Site) {

        $scope.users = User.query();
        $scope.groups = Usergroup.query();
        $scope.clients = Client.query();
        $scope.sites = Site.query();

        // Define languages
        $scope.languages = [{
            _id: 'en_US',
            name: 'English'
        }, {
            _id: 'de_DE',
            name: 'German'
        }];

        $scope.roles = [{
            _id: '1',
            name: 'Administrator'
        }];

        $scope.groupsselection = [];
        $scope.clientsselection = [];

        // toggle selection for a given group by id
        $scope.toggleGroupSelection = function toggleGroupSelection(groupName) {
            var idx = $scope.groupsselection.indexOf(groupName);

            // is currently selected
            if (idx != -1) {
                $scope.groupsselection.splice(idx, 1);
            }
            // is newly selected
            else {
                $scope.groupsselection.push(groupName);
            }
        };

        // toggle selection for a given client by id
        $scope.toggleClientSelection = function toggleClientSelection(clientName) {
            var idx = $scope.clientsselection.indexOf(clientName);

            // is currently selected
            if (idx != -1) {
                $scope.clientsselection.splice(idx, 1);
            }
            // is newly selected
            else {
                $scope.clientsselection.push(clientName);
            }
        };

        $scope.edit = function (user) {
            var modalClientInstance = $modal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'newUserModalTemplate.html',
                controller: 'AssistantUserModalCtrl',
                size: 400,
                resolve: {
                    user: function () {
                        return user;
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
                templateUrl: 'newUserModalTemplate.html',
                controller: 'AssistantUserModalCtrl',
                size: 400,
                resolve: {
                    user: function () {
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
                User.update({
                    _id: form.id,
                    name: form.name,
                    email: form.email,
                    role: form.role,
                    site: form.site,
                    groups: $scope.groupsselection,
                    clients: $scope.clientsselection,
                    defaultLanguage: form.defaultLanguage,
                    active: form.active
                }, function () {
                    $scope.users = User.query();
                });
            } else {
                User.save({

                }, function () {
                    $scope.users = User.query();
                });
            }

        };

        $scope.delete = function (user) {
            User.remove({
                id: user._id
            });
            angular.forEach($scope.users, function (u, i) {
                if (u === user) {
                    $scope.users.splice(i, 1);
                }
            });

        };
    });

angular.module('alleviosServerApp').controller('AssistantUserModalCtrl', function ($scope, $modalInstance, $controller, user, Site) {

    $controller('AdminCtrl', {
        $scope: $scope
    });

    $scope.user = user;
    $scope.sites = Site.query();

    var update = function () {
        if (user) {
            $scope.form.id = user._id;
            $scope.form.name = user.name;
            $scope.form.password = '';
            $scope.form.email = user.email;
            $scope.form.role = user.role;
            $scope.form.active = user.active;
            $scope.form.site = user.site;

            $scope.clientsselection = user.clients;
            $scope.groupsselection = user.groups;

            $scope.form.isEdit = true;

        } else {
            if ($scope.sites[0]) {
                $scope.form.site = $scope.sites[0]._id;
            }
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
