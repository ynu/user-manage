'use strict';

/**
 * @ngdoc function
 * @name userManageApp.controller:UserListCtrl
 * @description
 * # UserListCtrl
 * Controller of the userManageApp
 */
angular.module('userManageApp')
  .controller('UserListCtrl', function ($scope,userManager,Ynu, naguCM) {
    userManager.listAll(Ynu.AppId).then(function(users){
      var cids = [];
      $.each(users, function(i, user){
        cids.push(user.ConceptId);
      });
      naguCM.bulkGet(cids, {
        appId: Ynu.AppId
      }).then(function(users){
        $scope.users = users;
      });
    });
  });
