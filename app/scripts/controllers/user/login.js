'use strict';

/**
 * @ngdoc function
 * @name userManageApp.controller:UserLoginCtrl
 * @description
 * # UserLoginCtrl
 * Controller of the userManageApp
 */
angular.module('userManageApp')
  .controller('UserLoginCtrl', function ($scope, naguMM, $routeParams, $location, naguConfig, $rootScope) {
    var returnUrl = $routeParams['returnUrl'];
    $scope.returnUrl = encodeURIComponent( returnUrl);
    $scope.host = naguConfig.hosts[0];
    $scope.actions = {
      login: function(){
        if(!$scope.username || !$scope.password){
          alert('请输入用户名和密码');
          return;
        }
        $scope.loading.visible = true;

        naguMM.login($scope.username, $scope.password).then(function(me){
          if(me.Id){
            $rootScope.me = me;
            if(returnUrl) {
              window.location = returnUrl;
            } else {
              alert('登录成功，但无法自动跳转');
            }
          } else {
            alert('登录失败');
          }
          $scope.loading.visible = false;
        });
      }
    };
  });
