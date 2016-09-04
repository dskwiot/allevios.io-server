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
    .controller('ColorpickerCtrl', function ($scope, widgetConfig, socket) {

        $scope.colorpicker = {};

        $scope.changeColor = function (lamp, code) {
            code = code.replace('rgb(', '');
            code = code.replace(')', '');
            var c = code.split(',');
            code = {
                'lamp': lamp,
                'r': c[0],
                'g': c[1],
                'b': c[2]
            };
            socket.emit('changecolor', code);
        }

        $scope.$on('colorpicker-selected', function (color, i) {
            // use socket to send color to devicehub
            $scope.changeColor(0, $scope.colorpicker.value);
            $scope.changeColor(1, $scope.colorpicker.value);
            $scope.changeColor(2, $scope.colorpicker.value);

        });

    });
