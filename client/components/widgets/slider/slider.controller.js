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
    .controller('SliderCtrl', function ($scope, widgetConfig) {

        $scope.demoSlider = {};

        $scope.demoSlider.min = 0;
        $scope.demoSlider.max = 255;
        $scope.demoSlider.value = 0;

        $scope.translate = function (value) {
            return '$' + value;
        }

        $scope.onChange = function () {
            // use socket to send value to devicehub
        }

        $scope.onEnd = function () {
            // use socket to send value to devicehub
        }

    });
