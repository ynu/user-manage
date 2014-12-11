'use strict';

/**
 * @ngdoc service
 * @name userManageApp.userManager
 * @description
 * # userManager
 * Service in the userManageApp.
 */
angular.module('userManageApp')
  .service('userManager', function ($q) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    return {
       listAll: function(appId){
              var dtd = $q.defer();
              $.ajax('http://ngapi.ynu.edu.cn/MemberApi/ListMembers',{
                type: 'POST',
                crossDomain: true,
                xhrFields: {
                  withCredentials: true
          },
          data:{
            appId:appId
          },
          success: function (result) {
            if (result.ret == 0) {
              dtd.resolve(result.data);
            } else {
              dtd.reject(result);
            }
          },
          error: function () {
            dtd.reject();
          }
        });
        return dtd.promise;
      },
      create: function(user){
        var dtd = $q.defer();
        $.ajax('http://ngapi.ynu.edu.cn/MemberApi/CreateMember',{
          type: 'POST',
          crossDomain: true,
          xhrFields: {
            withCredentials: true
          },
          data:{
            username: user.username,
            password: user.password,
            appId:user.appId
          },
          success: function (result) {
            if (result.ret == 0) {
              dtd.resolve(result.data);
            } else {
              dtd.reject(result);
            }
          },
          error: function () {
            dtd.reject();
          }
        });
        return dtd.promise;
      }
    };
  });
