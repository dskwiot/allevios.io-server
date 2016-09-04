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
    .controller('ProjectCtrl', function ($scope, $translate, $modal, Auth, Project, Client) {
        $scope.projects = Project.query();
        $scope.clients = Client.query();

        $scope.form = {};

        $scope.edit = function (project) {
            var modalProjectInstance = $modal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'newProjectModalTemplate.html',
                controller: 'AssistantProjectModalCtrl',
                size: 400,
                resolve: {
                    project: function () {
                        return project;
                    }
                }
            });

            modalProjectInstance.result.then(function (form) {
                $scope.save(form);
            }, function () {

            });
        };

        $scope.add = function () {
            var modalProjectInstance = $modal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'newProjectModalTemplate.html',
                controller: 'AssistantProjectModalCtrl',
                size: 400,
                resolve: {
                    project: function () {
                        return undefined;
                    }
                }
            });

            modalProjectInstance.result.then(function (form) {
                $scope.save(form);
            }, function () {

            });

        };

        $scope.save = function (form) {
            if (form.isEdit == true) {
                Project.update({
                    _id: form.id,
                    name: form.name,
                    info: form.info,
                    client: form.client,
                    active: form.active
                }, function (project) {
                    $scope.projects = Project.query();
                });
            } else {
                Project.save({
                    name: form.name,
                    info: form.info,
                    client: form.client,
                    active: form.active
                }, function (project) {
                    $scope.projects = Project.query();
                });
            }
        };

        $scope.delete = function (project) {
            Project.remove({
                id: project._id
            });
            angular.forEach($scope.projects, function (p, i) {
                if (p === project) {
                    $scope.projects.splice(i, 1);
                }
            });

        };
    });

angular.module('alleviosServerApp').controller('AssistantProjectModalCtrl', function ($scope, $modalInstance, $controller, Auth, project) {

    $controller('ProjectCtrl', {
        $scope: $scope
    });

    $scope.project = project;

    var update = function () {
        if (project) {

            $scope.form.id = project._id;
            $scope.form.name = project.name;
            $scope.form.info = project.info;
            $scope.form.active = project.active;
            $scope.form.client = project.client;


            $scope.form.isEdit = true;

        } else {
            $scope.form.client = Auth.getCurrentClient();

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
