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

(function (angular) {
    'use strict';

    angular.module('nggaugejs', [])
        .directive('nggaugejs', [function () {
            return {
                restrict: 'AC',
                scope: {
                    'animationTime': '=',
                    'value': '=',
                    'options': '=',
                    'maxValue': '=',
                    'gaugeType': '='
                },
                controller: function ($scope, $element) {
                    if ($scope.gaugeType === 'donut') {
                        $scope.gauge = new Donut($element[0]);
                    } else {
                        $scope.gauge = new Gauge($element[0]);
                    }
                    $scope.gauge.maxValue = $scope.maxValue;
                    $scope.$watchCollection('[options, value]', function (newValues) {
                        $scope.gauge.setOptions(newValues[0]);
                        if (!isNaN(newValues[1])) {
                            $scope.gauge.set(newValues[1]);
                        }
                    });
                },
            };
    }]);

})(window.angular);
