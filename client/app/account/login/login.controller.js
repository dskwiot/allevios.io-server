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
    .controller('LoginCtrl', function($scope, $translate, Auth, $state, $window, forgotPasswordModal) {

      $scope.user = {};
      $scope.errors = {};

        $scope.showForgotPassword = function () {
            forgotPasswordModal();
        };

      /**
       * Login
       * @param {Object} form Submitted Form Data
       */
      $scope.login = function(form) {
        $scope.submitted = true;

        if (form.$valid) {
          Auth.login({
            email: $scope.user.email,
            password: $scope.user.password,
          })
                    .then(function() {
                      // Logged in, redirect to home
                      $state.go('main.dashboard');
                    })
                    .catch(function(err) {
                      $scope.errors.other = err.message;
                    });
        }
      };

      /**
       * OAuth Interface
       * @param {String} provider Name of OAuth Provider
       */
      $scope.loginOauth = function(provider) {
        $window.location.href = '/auth/' + provider;
      };

      $scope.cancel = $scope.$dismiss;

      $scope.submit = function(form) {
        $scope.submitted = true;

        if (form.$valid) {
          Auth.login({
            email: $scope.user.email,
            password: $scope.user.password,
          })
                    .then(function(user) {
                      $state.go('main.dashboard');
                      $scope.$close(user);
                    })
                    .catch(function(err) {
                      $scope.errors.other = err.message;
                    });
        }
      };
    });
