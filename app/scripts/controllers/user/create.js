'use strict';

/**
 * @ngdoc function
 * @name userManageApp.controller:UserCreateCtrl
 * @description
 * # UserCreateCtrl
 * Controller of the userManageApp
 */
angular.module('userManageApp')
  .controller('UserCreateCtrl', function ($scope, naguAppM,naguCM, naguMM) {
    naguAppM.list().then(function(apps){
      var cIds = [];
      $.each(apps, function(i, app){
        cIds.push(app.ConceptId);
      });
      naguCM.bulkGet(cIds).then(function(apps){
        $scope.apps = apps;
      });
    });
    $scope.user = {};
    $scope.actions = {
      createUser: function(){
        if($scope.user.password != $scope.user.password2){
          alert('密码不相同');
          return;
        }
        $scope.loading.visible = true;
        naguMM.create($scope.user).then(function(user){
          $scope.user = {};
          $scope.loading.visible = false;
        });
      }
    };
  });
