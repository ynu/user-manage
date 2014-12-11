'use strict';

/**
 * @ngdoc function
 * @name userManageApp.controller:UserCreateCtrl
 * @description
 * # UserCreateCtrl
 * Controller of the userManageApp
 */
angular.module('userManageApp')
  .controller('UserCreateCtrl', function ($scope, userManager, naguAppM,naguCM) {
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
        userManager.create($scope.user).then(function(user){
          alert('done');
        });
      }
    };
  });
