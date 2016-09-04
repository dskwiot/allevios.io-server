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
    .controller('SwitchCtrl', function ($scope, widgetConfig, socket) {

        $scope.yesNo = true;
        $scope.sentiment = true;

        $scope.switch = function (lamp, swcode) {
            var code = {
                'lamp': lamp,
                'switch': swcode,
            };
            socket.emit('sw', code);
        }

        $scope.changeCallback = function () {

            if ($scope.yesNo) {
                $scope.switch(0, 'turnOn');
                $scope.switch(1, 'turnOn');
                $scope.switch(2, 'turnOn');
            } else {
                $scope.switch(0, 'turnOff');
                $scope.switch(1, 'turnOff');
                $scope.switch(2, 'turnOff');
            }
        };


        $scope.changeSentiment = function () {
           socket.emit('sentiment', $scope.sentiment);
        };


    });

