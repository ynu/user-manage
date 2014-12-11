'use strict';

/**
 * @ngdoc function
 * @name userManageApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the userManageApp
 */
angular.module('userManageApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
