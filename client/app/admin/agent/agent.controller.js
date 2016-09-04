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
    .controller('AgentCtrl', function($scope, $translate, $modal, Auth, Agent, Connection, PubSub) {
      $scope.agents = Agent.query({});
      $scope.connections = Connection.query();

      $scope.form = {};

      var onAgentCreate = function() {
        $scope.agents = Agent.query({});
      };

      PubSub.subscribe({
            collectionName: 'Agent',
            method: 'POST',
          }, onAgentCreate);


      $scope.edit = function(agent) {

        var modalAgentInstance = $modal.open({
          animation: $scope.animationsEnabled,
          templateUrl: 'newAgentModalTemplate.html',
          controller: 'AssistantAgentModalCtrl',
          scope: $scope,
          size: 400,
          resolve: {
            agent: function() {
              return agent;
            },
          },
        });

        modalAgentInstance.result.then(function(form) {
          $scope.save(form);
        }, function() {

        });
      };

      $scope.add = function() {
        var modalAgentInstance = $modal.open({
          animation: $scope.animationsEnabled,
          templateUrl: 'newAgentModalTemplate.html',
          controller: 'AssistantAgentModalCtrl',
          scope: $scope,
          size: 400,
          resolve: {
            agent: function() {
              return undefined;
            },
          },
        });

        modalAgentInstance.result.then(function(form) {
          $scope.save(form);
        }, function() {

        });
      };

      $scope.save = function(form) {
        if (form.isEdit == true) {
          Agent.update({id: form.id,}, {
            id: form.id,
            name: form.name,
            info: form.info,
            connection_id: form.connection,
            active: form.active,
          }, function(agent) {
            $scope.agents = Agent.query();
          });
        } else {
          Agent.save({
            name: form.name,
            info: form.info,
            connection_id: form.connection,
            active: form.active,
          }, function(agent) {
            $scope.agents = Agent.query();
          });
        }

      };

      $scope.delete = function(agent) {
        Agent.remove({
          id: agent.id,
        });
        angular.forEach($scope.agents, function(c, i) {
          if (c === agent) {
            $scope.agents.splice(i, 1);
          }
        });

      };

    });

angular.module('alleviosServerApp').controller('AssistantAgentModalCtrl', function($scope, $modalInstance, $controller, Connection, agent) {

  $controller('AgentCtrl', {
    $scope: $scope,
  });

  $scope.agent = agent;
  $scope.connections = Connection.query();

  var update = function() {
    if (agent) {
      $scope.form.id = agent.id;
      $scope.form.name = agent.name;
      $scope.form.info = agent.info;
      $scope.form.connection = agent.connection_id;
      $scope.form.active = agent.active;
      $scope.form.isEdit = true;
    } else {
      if ($scope.connections[0]) {
        $scope.form.connection = $scope.connection[0].id;
      }

      $scope.form.active = true;
    }
    $scope.$apply();
  };

  setTimeout(update, 500);

  $scope.ok = function(form) {
    $modalInstance.close(form);
  };

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };

});
