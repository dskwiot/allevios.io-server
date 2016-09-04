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
    .controller('SiteCtrl', function($scope, $uibModal, Auth, SETTINGS, Site, PubSub) {
      $scope.animationsEnabled = SETTINGS.animationsEnabled;

      $scope.sites = Site.query();
      $scope.form = {};

      var onSiteCreate = function() {
        $scope.sites = Site.query({});
      };

      var onSiteUpdate = function() {
        $scope.sites = Site.query({});
      };

      PubSub.subscribe({
            collectionName: 'Site',
            method: 'POST',
          }, onSiteCreate);

      PubSub.subscribe({
        collectionName: 'Site',
        method: 'POST',
      }, onSiteUpdate);

      $scope.edit = function(site) {
        var modalSiteInstance = $uibModal.open({
          animation: $scope.animationsEnabled,
          templateUrl: 'newSiteModalTemplate.html',
          controller: 'AssistantSiteModalCtrl',
          scope: $scope,
          size: 400,
          resolve: {
            site: function() {
              return site;
            },
          },
        });

        modalSiteInstance.result.then(function(form) {
          $scope.save(form);
        }, function() {

        });

      };

      $scope.add = function() {

        var modalSiteInstance = $uibModal.open({
          animation: $scope.animationsEnabled,
          templateUrl: 'newSiteModalTemplate.html',
          controller: 'AssistantSiteModalCtrl',
          scope: $scope,
          size: 400,
          resolve: {
            site: function() {
              return undefined;
            },
          },
        });

        modalSiteInstance.result.then(function(form) {
          $scope.save(form);
        }, function() {

        });

      };

      $scope.save = function(form) {
        if (form.isEdit === true) {
          Site.update({
            id: form.id,}, {
            name: form.name,
            info: form.info,
            geoloc: form.geoloc,
            sitetype: form.sitetype,
            blueprint: form.blueprint,
            blueprintmarkerx: form.blueprintmarkerx,
            blueprintmarkery: form.blueprintmarkery,
            blueprintmarkerz: form.blueprintmarkerz,
          }, function(site) {
            $scope.sites = Site.query();
          });
        } else {
          Site.save({
            name: form.name,
            info: form.info,
            geoloc: form.geoloc,
            blueprint: form.blueprint,
            sitetype: form.sitetype,
            blueprintmarkerx: form.blueprintmarkerx,
            blueprintmarkery: form.blueprintmarkery,
            blueprintmarkerz: form.blueprintmarkerz,
          }, function(site) {
              $scope.sites = Site.query();
            });
        }

      };

      $scope.delete = function(site) {
        Site.remove({
          id: site.id,
        });
        angular.forEach($scope.sites, function(s, i) {
          if (s === site) {
            $scope.sites.splice(i, 1);
          }
        });
      };

    });

angular.module('alleviosServerApp').controller('AssistantSiteModalCtrl', function($scope, $uibModalInstance, $controller, Auth, site) {

  $controller('SiteCtrl', {
    $scope: $scope,
  });

  $scope.site = site;

  $scope.sitetypes = [{id: 1, name: 'Building', }, {id: 2, name: 'Room', }, ];

  var update = function() {
    if (site) {
      $scope.form.id = site.id;
      $scope.form.name = site.name;
      $scope.form.info = site.info;

      $scope.form.geoloc = site.geoloc;
      $scope.form.sitetype = site.sitetype;
      /*
    $scope.form.blueprint = site.blueprint;

    if (site.blueprintmarker) {
      $scope.form.blueprintmarkerx = site.blueprintmarker.x;
      $scope.form.blueprintmarkery = site.blueprintmarker.y;
      $scope.form.blueprintmarkerz = site.blueprintmarker.z;
    }
*/

      $scope.form.isEdit = true;

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

  $scope.showMap = function(update) {
    var x = document.getElementById('sitemap');

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var map = L.map('sitemap', {

        });

        // create the tile layer with correct attribution
        var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
        var osmAttrib = 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
        var osm = new L.TileLayer(osmUrl, {
          minZoom: 10,
          maxZoom: 19,
          attribution: osmAttrib,
        });

        map.setView(new L.LatLng(position.coords.latitude, position.coords.longitude), 12);
        map.addLayer(osm);

        var marker = L.marker([position.coords.latitude, position.coords.longitude], {id: 'marker', draggable: true,})
            .bindPopup('<b>' + $('#InputName').val() + '</b><br>' + $('#InputInfo').val())
            .addTo(map);

        marker.on('dragend', function(e) {
          var marker = e.target;
          var position = marker.getLatLng();
          $scope.form.geoloc = position.lat + ' ' + position.lng;
          $scope.$apply();
          marker.setLatLng([position.lat, position.lng] , {id: 'marker', draggable: true,})
              .bindPopup('<b>' + $('#InputName').val() + '</b><br>' + $('#InputInfo').val()).update();
        });


        if (update) {
          $scope.form.geoloc = position.coords.latitude + ' ' + position.coords.longitude;
          $scope.$apply();
        }

      });
    } else {
      x.innerHTML = 'Geolocation is not supported by this browser.';
    }
  };

  if (site) {
    $scope.showMap(false);
  } else {
    $scope.showMap(true);
  }
});
