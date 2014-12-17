'use strict';

/**
 * @ngdoc function
 * @name userManageApp.controller:UserCreateYnuCtrl
 * @description
 * # UserCreateYnuCtrl
 * Controller of the userManageApp
 */
angular.module('userManageApp')
  .controller('UserCreateYnuCtrl', function ($scope,Ynu, naguBz,naguMM) {

    $scope.user = {
      dept: '',
      appId: Ynu.AppId,
      Fss: [],
      Roles: []
    };

    // 获取所有校内机构，并初始化下拉列表
    naguBz.Ynu.XB001.getBzItems2().then(function (xb001) {
      $scope.xb001 = xb001;
      $scope.getSubDepts = function (parentId) {
        if (parentId === undefined) parentId = naguBz.Ynu.XB001.Id;

        return _.filter(xb001, function(bz){
          return bz.BelongsToId == parentId;
        });
      }
    });

    naguBz.Ynu.XB008.getBzItems().then(function(xb008){
      $scope.allRoles = xb008;
    });

    $scope.actions = {
      createUser: function(){

        if(!$scope.user.Name || !$scope.user.password || !$scope.user.dept
          || !$scope.user.office || !$scope.user.mobile){
          alert('XX字段不能为空');
        }
        if($scope.user.password != $scope.user.password2){
          alert('密码不相同');
          return;
        }


        // 真实姓名
        $scope.user.Fss.push({
          PredicateId: Nagu.Rdfs.Label,
          Object: $scope.user.Name,
          OType:Nagu.MType.Literal
        });

        // 所在部门
        $scope.user.Fss.push({
          PredicateId: Nagu.Contact.BelongsTo,
          Object: $scope.user.dept,
          OType:Nagu.MType.Concept
        });

        // 办公电话
        $scope.user.Fss.push({
          PredicateId: Nagu.Contact.OfficeNum,
          Object: $scope.user.office,
          OType:Nagu.MType.Literal
        });

        // 手机号码
        $scope.user.Fss.push({
          PredicateId: Nagu.Contact.CellPhoneNum,
          Object: $scope.user.mobile,
          OType:Nagu.MType.Literal
        });

        // 角色
        if($scope.user.roleIds) {
          $.each($scope.user.roleIds, function (i, role) {
            $scope.user.Fss.push({
              PredicateId: Nagu.Rdf.Type,
              Object: role,
              OType: Nagu.MType.Concept
            });
          });
        }

        $scope.loading.visible = true;
        naguMM.create($scope.user).then(function(user){
          $scope.user = {
            dept: '',
            appId: Ynu.AppId,
            Fss: [],
            Roles: []
          };
          $scope.loading.visible = false;
        }, function(result){
          alert('出错了：' + result.msg);
          $scope.loading.visible = false;
        });
      }
    }
  });
