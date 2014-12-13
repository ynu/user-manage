'use strict';

/**
 * @ngdoc function
 * @name userManageApp.controller:UserEditYnuCtrl
 * @description
 * # UserEditYnuCtrl
 * Controller of the userManageApp
 */
angular.module('userManageApp')
  .controller('UserEditYnuCtrl', function ($scope, naguBz, naguMM, Ynu, $routeParams) {

    // 初始化变量
    var userId = $routeParams['userId'];
    var appId = Ynu.AppId;
    var predicates = [
      Nagu.Contact.BelongsTo,
      Nagu.Contact.OfficeNum,
      Nagu.Contact.CellPhoneNum
    ];

    // 获取所有校内机构，并初始化下拉列表
    $scope.loading.visible = true;
    naguBz.Ynu.XB001.getBzItems2().then(function (xb001) {
      $scope.xb001 = xb001;
      $scope.getSubDepts = function (parentId) {
        if (parentId === undefined) parentId = naguBz.Ynu.XB001.Id;

        var depts = [];
        $.each(xb001, function(i, dept){
          if (dept.BelongsToIds.contains(parentId)) {
            depts.push(dept);
          }
        });
        return depts;
      };

      // 获取待更新的用户信息
      naguMM.getMember(userId, appId, predicates).then(function(user){
        user.Depts = [];
        user.OfficeNum = [];
        user.CellPhoneNum = [];
        user.roleIds = [];
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
        user.dept = user.Depts[0];
        user.office = user.OfficeNum[0];
        user.mobile = user.CellPhoneNum[0];

        $.each(user.Roles, function (i, role) {
          user.roleIds.push(role.ConceptId);
        });
        $scope.user = user;
        $scope.loading.visible = false;
      });

    });



    // 获取校内机构代码
    naguBz.Ynu.XB001.getBzItems().then(function(xb001){
      $scope.deptCategories = xb001;
    });

    // 获取校内应用系统角色标准
    naguBz.Ynu.XB008.getBzItems().then(function(xb008){
      $scope.allRoles = xb008;
    });

    $scope.actions = {
      createUser: function(){
        if($scope.user.password != $scope.user.password2){
          alert('密码不相同');
          return;
        }

        // 真实姓名
        $scope.user.fss.push({
          PredicateId: Nagu.Rdfs.Label,
          Object: $scope.user.name,
          OType:Nagu.MType.Literal
        });

        // 所在部门
        $scope.user.fss.push({
          PredicateId: Nagu.Contact.BelongsTo,
          Object: $scope.user.dept,
          OType:Nagu.MType.Concept
        });

        // 办公电话
        $scope.user.fss.push({
          PredicateId: Nagu.Contact.OfficeNum,
          Object: $scope.user.office,
          OType:Nagu.MType.Literal
        });

        // 手机号码
        $scope.user.fss.push({
          PredicateId: Nagu.Contact.CellPhoneNum,
          Object: $scope.user.mobile,
          OType:Nagu.MType.Literal
        });

        $scope.loading.visible = true;
        naguMM.create($scope.user).then(function(user){
          $scope.user = {
            dept: '',
            appId: Ynu.AppId,
            fss: []
          };
          $scope.loading.visible = false;
        }, function(result){
          alert('出错了：' + result.msg);
        });
      }
    };
  });
