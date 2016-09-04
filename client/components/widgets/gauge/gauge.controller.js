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
    .controller('GaugeCtrl', function ($scope, widgetConfig) {

        $scope.animationTime = 10;
        $scope.value = 3000;
        $scope.maxValue = 3000;
        $scope.gaugeType = 'donut';

        $scope.gaugeOptions = {
            lines: 12,
            // The number of lines to draw
            angle: 0.15,
            // The length of each line
            lineWidth: 0.44,
            // The line thickness
            pointer: {
                length: 0.9,
                // The radius of the inner circle
                strokeWidth: 0.035,
                // The rotation offset
                color: '#000000' // Fill color
            },
            limitMax: 'false',
            // If true, the pointer will not go past the end of the gauge
            colorStart: '#f39200',
            // Colors
            colorStop: '#f39200',
            // just experiment with them
            strokeColor: '#E0E0E0',
            // to see which ones work best for you
            generateGradient: true
        };

        $scope.donutGaugeOptions = {
            lines: 12,
            // The number of lines to draw
            angle: 0.15,
            // The length of each line
            lineWidth: 0.044,
            // The line thickness
            pointer: {
                length: 0.09,
                // The radius of the inner circle
                strokeWidth: 0.0035,
                // The rotation offset
                color: '#000000' // Fill color
            },
            limitMax: 'false',
            // If true, the pointer will not go past the end of the gauge
            colorStart: '#f39200',
            // Colors
            colorStop: '#f39200',
            // just experiment with them
            strokeColor: '#E0E0E0',
            // to see which ones work best for you
            generateGradient: true
        };

    });
