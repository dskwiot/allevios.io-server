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
    .controller('DatapointCtrl', function ($scope, $translate, Auth, Datapoint) {
        $scope.datapoints = Datapoint.datapoints.query();

        $scope.form = {};
        $scope.isEdit = false;
        $scope.isNew = false;

        $scope.edit = function (datapoint) {
            $scope.form.id = datapoint._id;
            $scope.form.name = datapoint.name;
            $scope.form.info = datapoint.info;
            $scope.form.io = datapoint.io;
            $scope.form.type = datapoint.type;
            $scope.form.active = datapoint.active;
            $scope.form.site = datapoint.site;

            $scope.isEdit = true;
            $scope.isNew = false;
        };

        $scope.add = function () {
            $scope.form = {};
            $scope.isNew = true;
            $scope.isEdit = false;
        };

        $scope.save = function (form) {

            if ($scope.isEdit) {
                Datapoint.update({
                    _id: form.id,
                    name: form.name,
                    info: form.info,
                    io: form.io,
                    type: form.type,
                    active: form.active
                });
            }

            if ($scope.isNew) {
                Datapoint.save({
                    name: form.name,
                    info: form.info,
                    io: form.io,
                    type: form.type,
                    active: form.active
                });
            }

            $scope.datapoints = Datapoint.datapoints.query();

            $scope.isEdit = false;
            $scope.isNew = false;
        };

        $scope.delete = function (datapoint) {
            Datapoint.remove({
                id: datapoint._id
            });
            angular.forEach($scope.datapoints, function (d, i) {
                if (d === datapoint) {
                    $scope.datapoints.splice(i, 1);
                }
            });

            $scope.isEdit = false;
            $scope.isNew = false;
        };
    });
