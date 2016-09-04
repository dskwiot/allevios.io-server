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
    .controller('NavbarCtrl', function ($scope, $state, $uibModal, $location, Auth, Project, Client) {

        $scope.isAdmin = Auth.isAdmin;

        $scope.menu = [];

        $scope.projects = Project.query(function () {
            if ($scope.projects.length === 1) $scope.changeProject($scope.projects[0]._id);
        });

        $scope.clients = Client.query(function () {
            if ($scope.clients.length === 1) $scope.changeClient($scope.clients[0]._id);
        });

        $scope.isCollapsed = true;
        $scope.isLoggedIn = Auth.isLoggedIn;
        $scope.isAdmin = Auth.isAdmin;
        $scope.getCurrentUser = Auth.getCurrentUser;

        if (Auth.isLoggedIn()) {
            $scope.menu = [{
                'title': 'Home',
                'link': '/#/'
            }];
        }

        $scope.showHome = function () {
            // $state.go('main');
            $location.path('/')
        };

        $scope.logout = function () {
            Auth.logout();
            $state.go('login');
        };

        $scope.isActive = function (route) {
            return route === $state.current;
        };

        $scope.changeProject = function (id) {
            Auth.changeProject(id, function (err) {});
        };

        $scope.changeClient = function (id) {
            Auth.changeClient(id, function (err) {});
        };

        $scope.editProfile = function () {
            var modalAgentInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'newUserprofileModalTemplate.html',
                controller: 'AssistantAgentModalCtrl',
                scope: $scope,
                size: 400,
                resolve: {
                    agent: function () {
                        return agent;
                    }
                }
            });

            modalAgentInstance.result.then(function (form) {
                $scope.save(form);
            }, function () {

            });
        };

        $('ul.nav li.dropdown').hover(function () {
            $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn(200);
        }, function () {
            $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut(200);
        });

    });

angular.module('alleviosServerApp').controller('AssistantUserprofileModalCtrl', function ($scope, $modalInstance, $controller) {

    $controller('UserprofileCtrl', {
        $scope: $scope
    });

    /*$scope.agent = agent;
    $scope.sites = Site.query();

    var update = function () {
        if (agent) {
            $scope.form.id = agent._id;
            $scope.form.name = agent.name;
            $scope.form.info = agent.info;
            $scope.form.site = agent.site;
            $scope.form.active = agent.active;
            $scope.form.isEdit = true;
        } else {
            if ($scope.sites[0]) {
                $scope.form.site = $scope.sites[0]._id;
            }

            $scope.form.active = true;
        }
        $scope.$apply();
    };

    setTimeout(update, 500);
*/
    $scope.ok = function (form) {
        $modalInstance.close(form);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

});
