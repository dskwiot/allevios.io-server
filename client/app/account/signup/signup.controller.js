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
    .controller('SignupCtrl', function($scope, $translate, Auth, $state, $window, loginModal) {
      $scope.user = {};
      $scope.errors = {};

      $scope.showLogin = function() {
        loginModal();
      };

      /**
       * Signup new User
       * @param {Object} form Submitted Form Data
       */
      $scope.register = function(form) {
        $scope.submitted = true;

        if (form.$valid) {
          Auth.createUser({
            username: $scope.user.email,
            email: $scope.user.email,
            password: $scope.user.password,
          })
                    .then(function() {
                      // Account created, redirect to home
                      $state.go('main');
                    })
                    .catch(function(err) {
                      err = err.data;
                      $scope.errors = {};

                      // Update validity of form fields that match the mongoose errors
                      angular.forEach(err.errors, function(error, field) {
                        form[field].$setValidity('mongoose', false);
                        $scope.errors[field] = error.message;
                      });
                    });
        }
      };

      $scope.cancel = $scope.$dismiss;

      /**
       * Signup new User
       * @param {Object} form Submitted Form Data
       */
      $scope.submit = function(form) {
        $scope.submitted = true;
        console.log(form);
        if (form.$valid) {
          Auth.createUser({
            username: $scope.user.email,
            email: $scope.user.email,
            password: $scope.user.password,
          })
                    .then(function() {
                      // Account created, redirect to home
                      $state.go('welcome');
                      $scope.$close(user);
                    })
                    .catch(function(err) {
                      err = err.data;
                      $scope.errors = {};

                      // Update validity of form fields that match the mongoose errors
                      angular.forEach(err.errors, function(error, field) {
                        form[field].$setValidity('mongoose', false);
                        $scope.errors[field] = error.message;
                      });
                    });
        }
      };

      $scope.loginOauth = function(provider) {
        $window.location.href = '/auth/' + provider;
      };
    });
