'use strict';

/**
 * @ngdoc function
 * @name userManageApp.controller:UserProfileCtrl
 * @description
 * # UserProfileCtrl
 * Controller of the userManageApp
 */
angular.module('userManageApp')
  .controller('UserProfileCtrl', function ($scope, $routeParams, naguMM, $location) {
    var userId = $routeParams['userId'];
    var returnUrl = $routeParams['returnUrl'];

    naguMM.getMe().then(function(me){
      if(me.Id){
        if(me.Id != userId){
          alert('无效的UserId');
        }
      } else {
        alert('你还未登录');
        $location.url('/user/login');
      }
    });

    $scope.actions = {
      changePassword: function(){
        if(!$scope.password || !$scope.password2 || !$scope.oldPassword){
          alert('三项都要填写');
          return;
        }
        if($scope.password != $scope.password2){
          alert('两次输入的新密码不一样');
          return;
        }
        $scope.loading.visible = true;

        naguMM.changePassword($scope.oldPassword, $scope.password).then(function(result){
          window.location = returnUrl;
        },function(result){
          alert('出错了：'+result.msg);
          $scope.loading.visible = false;
        });
      }
    }
  });
