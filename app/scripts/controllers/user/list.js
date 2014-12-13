'use strict';

/**
 * @ngdoc function
 * @name userManageApp.controller:UserListCtrl
 * @description
 * # UserListCtrl
 * Controller of the userManageApp
 */
angular.module('userManageApp')
  .controller('UserListCtrl', function ($scope, naguCM, naguMM,naguRole, naguBz, $routeParams) {

    var appId =$routeParams['appId'];
    $scope.appId = appId;

    // 获取校内应用系统角色标准
    naguBz.Ynu.XB008.getBzItems().then(function(bzs){
      $scope.xb008 = bzs;
    });

    // 获取校内机构代码，到第二级
    naguBz.Ynu.XB001.getBzItems2().then(function(xb001){
      $scope.xb001 = xb001;
    });

    var predicates = [
      Nagu.Contact.BelongsTo,
      Nagu.Contact.OfficeNum,
      Nagu.Contact.CellPhoneNum
    ];
    naguMM.allMembers(appId,predicates).then(function(users){
      $.each(users, function(i, user){
        user.Depts = [];
        user.OfficeNum = [];
        user.CellPhoneNum = [];
        $.each(user.Fss, function(j, fs){
          switch(fs.Predicate.ConceptId){
            case Nagu.Contact.BelongsTo:
                  user.Depts.push(fs.Object.ConceptId);
                  break;
            case Nagu.Contact.OfficeNum:
                  user.OfficeNum.push(fs.Object.Value);
                  break;
            case Nagu.Contact.CellPhoneNum:
                  user.CellPhoneNum.push(fs.Object.Value);
                  break;
          }
        });
      });
      $scope.users = users;
    });

    $scope.actions = {
      removeMember: function (index) {
        var user = $scope.users[index];
        if (confirm('确实要移除用户“' + user.FriendlyNames[0] + '”吗？')) {
          $scope.loading.visible = true;
          naguMM.removeMember(user.ConceptId, appId).then(function(){
            $scope.users.splice(index, 1);
            $scope.loading.visible = false;
          });
        }
      }
    };

      // 应用的友好名称
        $scope.appName = []
    $scope.appName['944c4890-a848-44b0-b1d7-a50217cfd405'] = 'ynu';
  });
