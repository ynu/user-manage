'use strict';

/**
 * @ngdoc function
 * @name userManageApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the userManageApp
 */
angular.module('userManageApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
