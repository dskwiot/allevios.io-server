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
    .controller('WorkflowCtrl', function($scope, $translate, $uibModal, $state, SETTINGS, Auth, Workflow) {
      $scope.animationsEnabled = SETTINGS.animationsEnabled;

      $scope.workflows = Workflow.query();
      $scope.workflowtypes = [{id: 1, name: $translate.instant('WORKFLOW.PresenceSimulation'),}, {id: 2, name: $translate.instant('WORKFLOW.CustomWorkflow'),}, {id: 3, name: $translate.instant('WORKFLOW.NodeRed'),}, ];
      $scope.form = {};

      $scope.edit = function(workflow) {
        var modalWorkflowInstance = $uibModal.open({
          animation: $scope.animationsEnabled,
          templateUrl: 'newWorkflowModalTemplate.html',
          controller: 'AssistantWorkflowModalCtrl',
          size: 400,
          resolve: {
            workflow: function() {
              return workflow;
            },
          },
        });

        modalWorkflowInstance.result.then(function(form) {
          $scope.save(form);
        }, function() {

        });
      };

      $scope.add = function() {
        var modalWorkflowInstance = $uibModal.open({
          animation: $scope.animationsEnabled,
          templateUrl: 'newWorkflowModalTemplate.html',
          controller: 'AssistantWorkflowModalCtrl',
          size: 400,
          resolve: {
            workflow: function() {
              return undefined;
            },
          },
        });

        modalWorkflowInstance.result.then(function(form) {
          $scope.save(form);
        }, function() {

        });

      };

      $scope.save = function(form) {
        if (form.isEdit == true) {
          Workflow.update({
            id: form.id,}, {
              name: form.name,
              info: form.info,
              workflowtype: form.workflowtype,
            }, function(workflow) {
            $scope.workflows = Workflow.query();
          });
        } else {
          Workflow.save({
            name: form.name,
            info: form.info,
            workflowtype: form.workflowtype,
          }, function(workflow) {
            $scope.workflows = Workflow.query();
          });
        }
      };

      $scope.delete = function(workflow) {
        Workflow.remove({
          id: workflow.id,
        });
        angular.forEach($scope.workflows, function(w, i) {
          if (w === workflow) {
            $scope.workflows.splice(i, 1);
          }
        });

        $scope.isEdit = false;
        $scope.isNew = false;
      };

      // open workflow designer in new window
      $scope.designer = function(workflow) {
        $state.go('main.workflowdesigner');
      };

    });

angular.module('alleviosServerApp').controller('AssistantWorkflowModalCtrl', function($scope, $uibModalInstance, $controller, Auth, workflow) {

  $controller('WorkflowCtrl', {
    $scope: $scope,
  });

  $scope.workflow = workflow;

  var update = function() {
    if (workflow) {

      $scope.form.id = workflow.id;
      $scope.form.name = workflow.name;
      $scope.form.info = workflow.info;
      $scope.form.workflowtype = workflow.workflowtype;
      $scope.form.isEdit = true;

    } else {
      $scope.form.active = true;
    }
    $scope.$apply();
  };

  setTimeout(update, 500);

  $scope.ok = function(form) {
    $uibModalInstance.close(form);
  };

  $scope.cancel = function() {
    $uibModalInstance.dismiss('cancel');
  };
});
