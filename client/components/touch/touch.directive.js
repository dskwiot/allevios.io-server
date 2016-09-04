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
    //
    // `$touch example`
    //

.directive('toucharea', ['$touch', function ($touch) {
    // Runs during compile
    return {
        restrict: 'C',
        link: function ($scope, elem) {
            $scope.touch = null;
            $touch.bind(elem, {
                start: function (touch) {
                    $scope.touch = touch;
                    $scope.$apply();
                },

                cancel: function (touch) {
                    $scope.touch = touch;
                    $scope.$apply();
                },

                move: function (touch) {
                    $scope.touch = touch;
                    $scope.$apply();
                },

                end: function (touch) {
                    $scope.touch = touch;
                    $scope.$apply();
                }
            });
        }
    };
}])

//
// `$drag` example: drag to dismiss
//
.directive('dragToDismiss', function ($drag, $parse, $timeout) {
    return {
        restrict: 'A',
        compile: function (elem, attrs) {
            var dismissFn = $parse(attrs.dragToDismiss);
            return function (scope, elem) {
                var dismiss = false;

                $drag.bind(elem, {
                    transform: $drag.TRANSLATE_RIGHT,
                    move: function (drag) {
                        if (drag.distanceX >= drag.rect.width / 4) {
                            dismiss = true;
                            elem.addClass('dismiss');
                        } else {
                            dismiss = false;
                            elem.removeClass('dismiss');
                        }
                    },
                    cancel: function () {
                        elem.removeClass('dismiss');
                    },
                    end: function (drag) {
                        if (dismiss) {
                            elem.addClass('dismitted');
                            $timeout(function () {
                                scope.$apply(function () {
                                    dismissFn(scope);
                                });
                            }, 300);
                        } else {
                            drag.reset();
                        }
                    }
                });
            };
        }
    };
})

//
// Another `$drag` usage example: this is how you could create
// a touch enabled "deck of cards" carousel. See `carousel.html` for markup.
//
.directive('carousel', function () {
    return {
        restrict: 'C',
        scope: {},
        controller: function () {
            this.itemCount = 0;
            this.activeItem = null;

            this.addItem = function () {
                var newId = this.itemCount++;
                this.activeItem = this.itemCount === 1 ? newId : this.activeItem;
                return newId;
            };

            this.next = function () {
                this.activeItem = this.activeItem || 0;
                this.activeItem = this.activeItem === this.itemCount - 1 ? 0 : this.activeItem + 1;
            };

            this.prev = function () {
                this.activeItem = this.activeItem || 0;
                this.activeItem = this.activeItem === 0 ? this.itemCount - 1 : this.activeItem - 1;
            };
        }
    };
})

.directive('carouselItem', function ($drag) {
    return {
        restrict: 'C',
        require: '^carousel',
        scope: {},
        transclude: true,
        template: '<div class="item"><div ng-transclude></div></div>',
        link: function (scope, elem, attrs, carousel) {
            scope.carousel = carousel;
            var id = carousel.addItem();

            var zIndex = function () {
                var res = 0;
                if (id === carousel.activeItem) {
                    res = 2000;
                } else if (carousel.activeItem < id) {
                    res = 2000 - (id - carousel.activeItem);
                } else {
                    res = 2000 - (carousel.itemCount - 1 - carousel.activeItem + id);
                }
                return res;
            };

            scope.$watch(function () {
                return carousel.activeItem;
            }, function () {
                elem[0].style.zIndex = zIndex();
            });

            $drag.bind(elem, {
                //
                // This is an example of custom transform function
                //
                transform: function (element, transform, touch) {
                    //
                    // use translate both as basis for the new transform:
                    //
                    var t = $drag.TRANSLATE_BOTH(element, transform, touch);

                    //
                    // Add rotation:
                    //
                    var Dx = touch.distanceX,
                        t0 = touch.startTransform,
                        sign = Dx < 0 ? -1 : 1,
                        angle = sign * Math.min((Math.abs(Dx) / 700) * 30, 30);

                    t.rotateZ = angle + (Math.round(t0.rotateZ));

                    return t;
                },
                move: function (drag) {
                    if (Math.abs(drag.distanceX) >= drag.rect.width / 4) {
                        elem.addClass('dismiss');
                    } else {
                        elem.removeClass('dismiss');
                    }
                },
                cancel: function () {
                    elem.removeClass('dismiss');
                },
                end: function (drag) {
                    elem.removeClass('dismiss');
                    if (Math.abs(drag.distanceX) >= drag.rect.width / 4) {
                        scope.$apply(function () {
                            carousel.next();
                        });
                    }
                    drag.reset();
                }
            });
        }
    };
})

.directive('menuSlideout', function ($swipe, $document, $rootScope) {
    return {
        restrict: 'A',
        link: function (scope, $elem, attrs) {
            var startCoords, dir, endCoords, lastCoords,

                // how far horizontally do I need to move
                // before we do anything?
                tolerance = 10,

                // just keeping trying of if we met the tolerance
                toleranceMet = false,

                // if we slide this far in a particular
                // direction, we ignore the direction
                slideTolerance = 100,

                // NYI until Angular allows config of the tolerances
                moveYBufferRadius = 30,

                // we toggle transitionClass cuz we don't want to
                // transition while we're actually dragging
                transitionClass = 'menu-slideout-transition',
                openClass = 'menu-slideout-open',
                isSlidingClass = 'menu-slideout-is-sliding',

                // TODO: make the menu open all but X pixels of window
                // var menuWidth = $document[0].width - 74;
                // angular.element(document).find('head').append('<style type="text/css">@charset "UTF-8";.slider.open{-webkit-transform: translate3d(' + menuWidth + 'px, 0, 0);</style>');
                menuWidth = 230,

                // adapted from http://davidwalsh.name/vendor-prefix
                prefix = (function () {
                    var styles = window.getComputedStyle(document.documentElement, ''),
                        pre = (Array.prototype.slice
                            .call(styles)
                            .join('')
                            .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
                        )[1];
                    return '-' + pre + '-';
                })();

            $swipe.bind($elem, {
                start: function (coords, event) {
                    toleranceMet = false;
                    startCoords = angular.copy(lastCoords = coords);
                },
                end: function (coords, event) {
                    endCoords = coords;

                    $elem.removeAttr('style').addClass(transitionClass).removeClass(isSlidingClass);
                    if (!toleranceMet) return;

                    // if we slide more than slideTolerance pixels
                    // in a particular direction, then we override dir
                    if (coords.x - startCoords.x > slideTolerance) dir = 'right';
                    if (coords.x - startCoords.x < (-1 * slideTolerance)) dir = 'left';

                    if (dir == 'right') $elem.addClass(openClass);
                    else $elem.removeClass(openClass);

                    $rootScope.$broadcast('slideMenuToggled', dir == 'right');
                },
                move: function (coords, event) {
                    // set a tolerance before we kick in sliding
                    // (Angular does this to an extent, also, I believe)
                    if (!toleranceMet && Math.abs(startCoords.x - coords.x) < tolerance) return;
                    dir = lastCoords.x < coords.x ? 'right' : 'left';
                    $elem.removeClass(transitionClass).addClass(isSlidingClass);

                    // restrict x to be between 0 and menuWidth
                    var x = coords.x - startCoords.x + ($elem.hasClass(openClass) ? menuWidth : 0);
                    x = Math.max(0, Math.min(menuWidth, x));

                    // translate3d is WAY more performant than left
                    // thanks to GPU acceleration (especially
                    // noticeable on slower, mobile devices)
                    var props = {};
                    props[prefix + 'transform'] = 'translate3d(' + x + 'px, 0, 0)';
                    $elem.css(props);

                    lastCoords = coords;
                    toleranceMet = true;
                },
                cancel: function (coords, event) {
                    $elem.addClass(transitionClass).removeClass(isSlidingClass);
                    $elem.removeAttr('style');
                }
            }, {
                moveYBufferRadius: moveYBufferRadius
            });

            $rootScope.$on('toggleSlideMenu', function (event, isOpen) {
                $elem.toggleClass(openClass, isOpen);
            });
        }
    };
})

.directive('dragMe', ['$drag', function ($drag) {
    return {
        controller: function ($scope, $element) {
            $drag.bind($element, {
                //
                // Here you can see how to limit movement
                // to an element
                //
                transform: $drag.TRANSLATE_INSIDE($element.parent()),
                end: function (drag) {
                    // go back to initial position
                    drag.reset();
                }
            }, { // release touch when movement is outside bounduaries
                sensitiveArea: $element.parent()
            });
        }
    };
}])
