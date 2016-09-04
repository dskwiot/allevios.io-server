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
    .factory('Auth', function Auth($rootScope, $http, User, $cookieStore, $q, SETTINGS) {
        var currentUser = {};
        var currentClient = {};
        var currentProject = {};

        var PROJECT_CHANGED = 'PROJECT_CHANGED';
        var CLIENT_CHANGED = 'CLIENT_CHANGED';

        if ($cookieStore.get('token')) {
            currentUser = User.get({
                id: $cookieStore.get('userId')
            });
            currentClient = $cookieStore.get('client');
            currentProject = $cookieStore.get('project');
        }

        return {

            /**
             * Authenticate user and save token
             *
             * @param  {Object}   user     - login info
             * @param  {Function} callback - optional
             * @return {Promise}
             */
            login: function (user, callback) {
                var cb = callback || angular.noop;
                var deferred = $q.defer();

                $http.post(SETTINGS.url + '/users/login', {
                    email: user.email,
                    password: user.password
                }).
                success(function (data) {
                    $cookieStore.put('token', data.id);
                    $cookieStore.put('userId', data.userId);
                    currentUser = User.get({
                        id: $cookieStore.get('userId')
                    });
                    deferred.resolve(data);
                    return cb();
                }).
                error(function (err) {
                    this.logout();
                    deferred.reject(err);
                    return cb(err);
                }.bind(this));

                return deferred.promise;
            },

            /**
             * Delete access token and user info
             *
             * @param  {Function}
             */
            logout: function () {
                $cookieStore.remove('token');
                $cookieStore.remove('userId');
                currentUser = {};
            },

            /**
             * Create a new user
             *
             * @param  {Object}   user     - user info
             * @param  {Function} callback - optional
             * @return {Promise}
             */
            createUser: function (user, callback) {
                var cb = callback || angular.noop;

                return User.save(user,
                    function (data) {
                      $cookieStore.put('token', data.id);
                        currentUser = User.get();
                        return cb(user);
                    },
                    function (err) {
                        this.logout();
                        return cb(err);
                    }.bind(this)).$promise;
            },

            /**
             * Change password
             *
             * @param  {String}   oldPassword
             * @param  {String}   newPassword
             * @param  {Function} callback    - optional
             * @return {Promise}
             */
            changePassword: function (oldPassword, newPassword, callback) {
                var cb = callback || angular.noop;

                return User.changePassword({
                    id: currentUser._id
                }, {
                    oldPassword: oldPassword,
                    newPassword: newPassword
                }, function (user) {
                    return cb(user);
                }, function (err) {
                    return cb(err);
                }).$promise;
            },

            /**
             * Change Client
             * @param {String} newClient
             * @param {Function} callback
             */
            changeClient: function (newClient, callback) {
                var cb = callback || angular.noop;
                $cookieStore.put('client', newClient);

                $rootScope.$broadcast(CLIENT_CHANGED, {

                });

                return cb();
            },

            /**
             * Change Project
             * @param {String} newProject
             * @param {Function} callback
             */
            changeProject: function (newProject, callback) {
                var cb = callback || angular.noop;
                $cookieStore.put('project', newProject);

                $rootScope.$broadcast(PROJECT_CHANGED, {

                });

                return cb();
            },

            /**
             * Gets all available info on authenticated user
             *
             * @return {Object} user
             */
            getCurrentUser: function () {
                return currentUser;
            },

            /**
             * Get current Project
             * @returns {String} project
             */
            getCurrentProject: function () {
                return ($cookieStore.get('project'));
            },

            /**
             * Get current Client
             * @returns {String} client
             */
            getCurrentClient: function () {
                return ($cookieStore.get('client'));
            },

            /**
             * Check if a user is logged in
             *
             * @return {Boolean}
             */
            isLoggedIn: function () {
                return currentUser.hasOwnProperty('id');
            },

            /**
             * Waits for currentUser to resolve before checking if user is logged in
             */
            isLoggedInAsync: function (cb) {
                if (currentUser.hasOwnProperty('$promise')) {
                    currentUser.$promise.then(function () {
                        cb(true);
                    }).catch(function () {
                        cb(false);
                    });
                } else if (currentUser.hasOwnProperty('id')) {
                    cb(true);
                } else {
                    cb(false);
                }
            },

            /**
             * Check if a user is an admin
             *
             * @return {Boolean}
             */
            isAdmin: function () {
                return currentUser.role === 'admin';
            },

            /**
             * Get auth token
             */
            getToken: function () {
                return $cookieStore.get('token');
            },

            /**
             * Event Listener for Client has changed
             * @param {Object}   $scope  [[Description]]
             * @param {[[Type]]} handler [[Description]]
             */
            onClientChanged: function ($scope, handler) {
                $scope.$on(CLIENT_CHANGED, function (event, message) {
                    handler(message);
                });
            },

            /**
             * Event Listener for Project has changed
             * @param {Object}   $scope  [[Description]]
             * @param {[[Type]]} handler [[Description]]
             */
            onProjectChanged: function ($scope, handler) {
                $scope.$on(PROJECT_CHANGED, function (event, message) {
                    handler(message);
                });
            },


        };
    });
