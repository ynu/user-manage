'use strict';

/**
 * @ngdoc function
 * @name userManageApp.controller:UserEditYnuCtrl
 * @description
 * # UserEditYnuCtrl
 * Controller of the userManageApp
 */
angular.module('userManageApp')
  .controller('UserEditYnuCtrl', function ($scope, naguBz, naguMM, Ynu, $routeParams, naguRole, naguSM, naguCM) {

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

    var dtdXb001 = naguBz.Ynu.XB001.getBzItems2();
    dtdXb001.then(function (xb001) {
      $scope.xb001 = xb001;
      $scope.getSubDepts = function (parentId) {
        if (parentId === undefined) parentId = naguBz.Ynu.XB001.Id;

        return _.filter(xb001, function(bz){
          return bz.BelongsToId == parentId;
        });
      };
      naguBz.Ynu.XB001.getBzItems().then(function(bzs){
        $scope.depts = bzs;
      });

      // 获取待更新的用户信息
      naguMM.getMember(userId, appId, predicates).then(function(user){
        user.Depts = [];
        user.OfficeNum = [];
        user.CellPhoneNum = [];
        $scope.roleIds = [];
        _.each(user.Roles, function(role){
          $scope.roleIds.push(role.ConceptId);
        });
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

        naguCM.bulkGet(user.Depts, {
          appId: Ynu.AppId,
          keys: Ynu.Read
        })
        $scope.user = user;
        $scope.loading.visible = false;
      });

    });



    // 获取校内应用系统角色标准
    naguBz.Ynu.XB008.getBzItems().then(function(xb008){
      $scope.allRoles = xb008;
    });

    $scope.actions = {
      roleSelectChanged: function(roleId){
        naguRole.addRole($scope.user.ConceptId, roleId, Ynu.AppId).then(function(){
          $scope.newRoleId = '';
          $scope.roleIds.push(roleId);
        });
      },
      removeRole: function(roleId){
        naguRole.removeRole($scope.user.ConceptId, roleId, Ynu.AppId).then(function(){
          $scope.roleIds = _.remove($scope.roleIds, roleId);
        });
      },
      addName: function(){
        naguSM.create({
          AppId: Ynu.AppId,
          SubjectId: $scope.user.ConceptId,
          SType: Nagu.MType.Concept,
          PredicateId: Nagu.Rdfs.Label,
          Object: $scope.user.Name,
          OType: Nagu.MType.Literal
        }).then(function (fs) {
        });
      },
      addOfficeNum: function(){
        naguSM.create({
          AppId: Ynu.AppId,
          SubjectId: $scope.user.ConceptId,
          SType: Nagu.MType.Concept,
          PredicateId: Nagu.Contact.OfficeNum,
          Object: $scope.user.office,
          OType: Nagu.MType.Literal
        }).then(function (fs) {

        });
      },
      addCellPhoneNum: function(){
        naguSM.create({
          AppId: Ynu.AppId,
          SubjectId: $scope.user.ConceptId,
          SType: Nagu.MType.Concept,
          PredicateId: Nagu.Contact.CellPhoneNum,
          Object: $scope.user.mobile,
          OType: Nagu.MType.Literal
        }).then(function (fs) {

        });
      },
      deptSelectChanged: function(bz){
        naguBz.Ynu.XB001.getBzItems(bz.Id).then(function(bzs){
          bz.SubItems = bzs;
        });
      },
      addDept: function(dept){
        naguSM.create({
          AppId: Ynu.AppId,
          SubjectId: $scope.user.ConceptId,
          SType: Nagu.MType.Concept,
          PredicateId: Nagu.Contact.BelongsTo,
          Object: dept.Id,
          OType: Nagu.MType.Concept
        }).then(function (fs) {
          $scope.user.Depts.push(dept.Id);
          $scope.user.Depts = _.uniq($scope.user.Depts);
        });
      },
      removeDept: function(deptId){
        naguSM.del(deptId, Ynu.AppId).then(function(){
          $scope.user.Depts = _.remove($scope.user.Depts, deptId);
        });
      }

    };
  });
