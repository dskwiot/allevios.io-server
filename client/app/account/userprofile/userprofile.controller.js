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
    .controller('UserprofileCtrl', function ($scope, $translate, $modal, Auth, Agent, Site) {
        $scope.agents = Agent.query();
        $scope.sites = Site.query();

        $scope.form = {};

        /**
         * Open Modal to Edit Userprofile
         * @param   {Agent} agent Agent Object to Edit
         * @returns {Agent} Agent Object
         */
        $scope.edit = function (agent) {

            var modalAgentInstance = $modal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'newAgentModalTemplate.html',
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

        /**
         * Open Modal to Add new Userprofile
         */
        $scope.add = function () {
            var modalAgentInstance = $modal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'newAgentModalTemplate.html',
                controller: 'AssistantAgentModalCtrl',
                scope: $scope,
                size: 400,
                resolve: {
                    agent: function () {
                        return undefined;
                    }
                }
            });

            modalAgentInstance.result.then(function (form) {
                $scope.save(form);
            }, function () {

            });
        };

        /**
         * Save or Update Agent
         * @param {Object} form Submitted Form Data
         */
        $scope.save = function (form) {
            if (form.isEdit == true) {
                Agent.update({
                    _id: form.id,
                    name: form.name,
                    info: form.info,
                    site: form.site,
                    active: form.active
                }, function (agent) {
                    $scope.agents = Agent.query();
                });
            } else {
                Agent.save({
                    name: form.name,
                    info: form.info,
                    site: form.site,
                    active: form.active
                }, function (agent) {
                    $scope.agents = Agent.query();
                });
            }

        };

        /**
         * Delete Agent
         * @param {Object} agent Agent Object to Delete
         */
        $scope.delete = function (agent) {
            Agent.remove({
                id: agent._id
            });
            angular.forEach($scope.agents, function (c, i) {
                if (c === agent) {
                    $scope.agents.splice(i, 1);
                }
            });

        };
    });

angular.module('alleviosServerApp').controller('AssistantAgentModalCtrl', function ($scope, $modalInstance, $controller, Site, agent) {

    $controller('UserprofileCtrl', {
        $scope: $scope
    });

    $scope.agent = agent;
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

    $scope.ok = function (form) {
        $modalInstance.close(form);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

});
