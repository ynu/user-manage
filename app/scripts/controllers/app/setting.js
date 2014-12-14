'use strict';

/**
 * @ngdoc function
 * @name userManageApp.controller:AppSettingCtrl
 * @description
 * # AppSettingCtrl
 * Controller of the userManageApp
 */
angular.module('userManageApp')
  .controller('AppSettingCtrl', function ($scope, $routeParams, naguAppM,naguCM) {
    var appId = $routeParams['appId'];
    naguAppM.get(appId).then(function(app){
      $scope.app = app;
    });

    $scope.actions = {
      addManager: function(){
        var userId = window.prompt('请输入新管理员的Id');
        if(userId) {
          var reg = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
          if (reg.test(userId)) {
            naguAppM.addManager(userId, appId).then(function () {
              naguCM.get(userId).then(function(c){
                $scope.app.Managers.push(c);
              });
            }, function (result) {
              alert('出错了：'+ result.msg);
            });
          } else {
            alert('格式不对');
          }
        }
      }
    };
  });
