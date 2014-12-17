'use strict';

/**
 * @ngdoc function
 * @name userManageApp.controller:NavBarCtrl
 * @description
 * # NavBarCtrl
 * Controller of the userManageApp
 */
angular.module('userManageApp')
  .controller('NavBarCtrl', function ($scope, $q, $rootScope, $location, naguMM) {
    $scope.returnUrl = encodeURIComponent($location.absUrl());
      $scope.version = '0.3.0';
      $rootScope.me = {};
      naguMM.getMe().then(function (me) {
        $rootScope.me = me;
          if (me.ret == 0) {
              if (me.FigureUrls.length == 0 || me.FigureUrls[0] == '/Content/Images/logo.png')
                  me.FigureUrls[0] = 'http://ngapi.ynu.edu.cn/Content/Images/logo.png';
          } else {

          }
      });


      $scope.actions = {
          logout: function () {
              naguMM.logout().then(function () {
                  $location.url('/login?returnUrl=' + $scope.returnUrl);
              });
          }
      };
  });
