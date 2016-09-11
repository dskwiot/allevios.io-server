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
    .controller('DashboardCtrl', function($scope, $translate, $http, $state, socket, PubSub, Thing, Datapoint, Auth, User, Site) {
      $scope.awesomeThings = [];
      $scope.datapointcount = 0;
      $scope.things = Thing.query(function() {
        $scope.thingscount = $scope.things.length;
      });

      var onThingStatus = function() {
        console.log('ThingStatus');
      };

      PubSub.subscribe({
        collectionName: 'ThingStatus',
        method: 'POST',
      }, onThingStatus);

      $scope.navigateTo = function(route) {
        $state.go(route);
      };

      // Query Things and add them to the Map
      Thing.query(function(d) {
        angular.forEach(d, function(k, v) {
          $scope.datapointcount += k._datapoints.length;
          // get site
          if (k.site_id) {
            Site.get({
              id: k.site_id,
            }, function(s) {
              var sgeo = s;
              if (sgeo.geoloc) {
                var location = sgeo.geoloc.split(' ');
                var geo = {
                  'type': 'Feature',
                  'properties': {
                    'name': sgeo.name,
                    'amenity': sgeo.info,
                    'popupContent': k.name + ' - ' + sgeo.name,
                  },
                  'geometry': {
                    'type': 'Point',
                    'coordinates': [location[1], location[0], ],
                  },
                };
                L.geoJson(geo, {
                  onEachFeature: onEachFeature,
                }).addTo(map);
              }
            });
          }
        });

      });

      $scope.measurements = 2.5;

      if (Auth.isAdmin()) {
        $scope.users = User.query(function() {
          $scope.usercount = $scope.users.length;
        });
      } else {
        $scope.usercount = 0;
      }

      var socialdata = [{
        name: 'negative',
        data: [0, 2, 7, 0, 1, 3, 91, 15, ],
      }, {
        name: 'neutral',
        data: [449, 510, 787, 570, 495, 442, 2313, 375, ],
      }, {
        name: 'positive',
        data: [25, 16, 31, 29, 24, 29, 65, 3, ],
      }, ];

      var chart = $('#sentiment').highcharts({
        colors: ['#50B432', '#ED561B', '#DDDF00', '#24CBE5',
                            '#64E572', '#FF9655', '#FFF263', '#6AF9C4', ],
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie',
        },
        title: {
          text: 'Twitter Sentiment',
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: false,
              format: '<b>{point.name}</b>: {point.percentage:.1f} %',
              style: {
                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
              },
            },
          },
        },
        series: [{
          name: 'Sentiment',
          colorByPoint: true,
          data: [{
            name: 'Positive',
            y: 70,
            selected: true,
          }, {
            name: 'Negative',
            y: 25,
          }, {
            name: 'Neutral',
            y: 5,
          }, ],
        }, ],
      });

      /*        socket.syncUpdates('social', $scope.websays, function (event, data) {

                  var chart = $('#sentiment').highcharts();

                  chart.series[0].setData([{
                      name: "Positive",
                      y: data.sentiment.sumPositive,
                      selected: true
                      }, {
                      name: "Negative",
                      y: data.sentiment.sumNegative,
                  }, {
                      name: "Neutral",
                      y: data.sentiment.sumNeutral,
                  }]);

              }); */

      // Initialize map and default to Austria
      var map = L.map('world-map').setView([47.8216323, 13.019954799999999, ], 1);

      // If User allows Location then set view to users location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          map.setView(new L.LatLng(position.coords.latitude, position.coords.longitude), 1);
        });
      };

      // Get Tile from OpenStreetMap
      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // Define Style of Marker
      var markerStyle = {
        color: '#ff7800',
        weight: 5,
        opacity: 1,
        fillOpacity: 0.3,
        fillColor: '#ff7800',
      };

      // Define Default Marker Icon
      var markerIcon = L.icon({
        iconUrl: '/assets/icons/Ardrone_600x600.png',
        iconRetinaUrl: 'my-icon@2x.png',
        iconSize: [38, 95, ],
        iconAnchor: [22, 94, ],
        popupAnchor: [-3, -76, ],
        shadowUrl: 'my-icon-shadow.png',
        shadowRetinaUrl: 'my-icon-shadow@2x.png',
        shadowSize: [68, 95, ],
        shadowAnchor: [22, 94, ],
      });

      function onEachFeature(feature, layer) {
        // does this feature have a property named popupContent?
        if (feature.properties && feature.properties.popupContent) {
          layer.bindPopup(feature.properties.popupContent);
        }
      }

      $scope.showAssistant = function(a) {
        // @todo    $state.go('/admin/assistant/' + a);
      };

      //Make the dashboard widgets sortable Using jquery UI
      $('.connectedSortable').sortable({
        placeholder: 'sort-highlight',
        connectWith: '.connectedSortable',
        handle: '.box-header, .nav-tabs',
        forcePlaceholderSize: true,
        zIndex: 999999,
      });
      $('.connectedSortable .box-header, .connectedSortable .nav-tabs-custom').css('cursor', 'move');

      //jQuery UI sortable for the todo list
      $('.todo-list').sortable({
        placeholder: 'sort-highlight',
        handle: '.handle',
        forcePlaceholderSize: true,
        zIndex: 999999,
      });

      //bootstrap WYSIHTML5 - text editor
      $scope.$on('$viewContentLoaded', function() {
        $('.textarea').wysihtml5();
      });

      $('.daterange').daterangepicker({
        ranges: {
          'Today': [moment(), moment(), ],
          'Yesterday': [moment().subtract('days', 1), moment().subtract('days', 1), ],
          'Last 7 Days': [moment().subtract('days', 6), moment(), ],
          'Last 30 Days': [moment().subtract('days', 29), moment(), ],
          'This Month': [moment().startOf('month'), moment().endOf('month'), ],
          'Last Month': [moment().subtract('month', 1).startOf('month'), moment().subtract('month', 1).endOf('month'), ],
        },
        startDate: moment().subtract('days', 29),
        endDate: moment(),
      },
            function(start, end) {
              alert('You chose: ' + start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
            });

      /* jQueryKnob */
      $('.knob').knob();

      //Sparkline charts
      var myvalues = [1000, 1200, 920, 927, 931, 1027, 819, 930, 1021, ];
      $('#sparkline-1').sparkline(myvalues, {
        type: 'line',
        lineColor: '#92c1dc',
        fillColor: '#ebf4f9',
        height: '50',
        width: '80',
      });
      myvalues = [515, 519, 520, 522, 652, 810, 370, 627, 319, 630, 921, ];
      $('#sparkline-2').sparkline(myvalues, {
        type: 'line',
        lineColor: '#92c1dc',
        fillColor: '#ebf4f9',
        height: '50',
        width: '80',
      });
      myvalues = [15, 19, 20, 22, 33, 27, 31, 27, 19, 30, 21, ];
      $('#sparkline-3').sparkline(myvalues, {
        type: 'line',
        lineColor: '#92c1dc',
        fillColor: '#ebf4f9',
        height: '50',
        width: '80',
      });

      //The Calender
      $('#calendar').datepicker();

      // CO2 Linechart
      var line = new Morris.Line({
        element: 'line-chart',
        resize: true,
        data: [
                {
                  y: '2011 Q1',
                  item1: 2666,
                },
                {
                  y: '2011 Q2',
                  item1: 2778,
                },
                {
                  y: '2011 Q3',
                  item1: 4912,
                },
                {
                  y: '2011 Q4',
                  item1: 3767,
                },
                {
                  y: '2012 Q1',
                  item1: 6810,
                },
                {
                  y: '2012 Q2',
                  item1: 5670,
                },
                {
                  y: '2012 Q3',
                  item1: 4820,
                },
                {
                  y: '2012 Q4',
                  item1: 15073,
                },
                {
                  y: '2013 Q1',
                  item1: 10687,
                },
                {
                  y: '2013 Q2',
                  item1: 8432,
                },
    ],
        xkey: 'y',
        ykeys: ['item1', ],
        labels: ['Item 1', ],
        lineColors: ['#efefef', ],
        lineWidth: 2,
        hideHover: 'auto',
        gridTextColor: '#fff',
        gridStrokeWidth: 0.4,
        pointSize: 4,
        pointStrokeColors: ['#efefef', ],
        gridLineColor: '#efefef',
        gridTextFamily: 'Open Sans',
        gridTextSize: 10,
      });

      //Fix for charts under tabs
      $('.box ul.nav a').on('shown.bs.tab', function(e) {
        area.redraw();
        donut.redraw();
      });

      /* BOX REFRESH PLUGIN EXAMPLE (usage with morris charts) */
      $('#loading-example').boxRefresh({
        source: 'ajax/dashboard-boxrefresh-demo.php',
        onLoadDone: function(box) {
          bar = new Morris.Bar({
            element: 'bar-chart',
            resize: true,
            data: [
                        {
                          y: '2006',
                          a: 100,
                          b: 90,
                        },
                        {
                          y: '2007',
                          a: 75,
                          b: 65,
                        },
                        {
                          y: '2008',
                          a: 50,
                          b: 40,
                        },
                        {
                          y: '2009',
                          a: 75,
                          b: 65,
                        },
                        {
                          y: '2010',
                          a: 50,
                          b: 40,
                        },
                        {
                          y: '2011',
                          a: 75,
                          b: 65,
                        },
                        {
                          y: '2012',
                          a: 100,
                          b: 90,
                        },
        ],
            barColors: ['#00a65a', '#f56954', ],
            xkey: 'y',
            ykeys: ['a', 'b', ],
            labels: ['CPU', 'DISK', ],
            hideHover: 'auto',
          });
        },
      });

      $.notify({
        icon: 'pe-7s-smile',
        message: 'Welcome to <b>allevios.io</b> - easy to use Socialized Open Source IoT.',

      }, {
        type: 'info',
        timer: 1500,
        placement: {
          from: 'top',
          align: 'center',
        },
      });

    });
