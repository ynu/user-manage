'use strict';

/**
 * @ngdoc function
 * @name userManageApp.controller:RoleListCtrl
 * @description
 * # RoleListCtrl
 * Controller of the userManageApp
 */
angular.module('userManageApp')
  .controller('RoleListCtrl', function ($scope, roleManager,Ynu,$q,naguCM) {
    roleManager.listAll(Ynu.AppId).then(function(roles){
      var dtd = $q.defer();
      var cIds = [];
      $.each(roles, function(i, role){
        cIds.push(role.ConceptId);
      });
      naguCM.bulkGet(cIds,{
        appId:Ynu.AppId
      }).then(function(roles){
        $scope.roles = roles;
      });
    });
  });
