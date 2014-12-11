'use strict';

/**
 * @ngdoc service
 * @name userManageApp.roleManager
 * @description
 * # roleManager
 * Service in the userManageApp.
 */
angular.module('userManageApp')
  .service('roleManager', function ($q) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    return {
      listAll: function(appId){
        var dtd = $q.defer();
        $.ajax('http://ngapi.ynu.edu.cn/MemberApi/ListRoles',{
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
          error: function (a, b, c) {
            dtd.reject();
          }
        });
        return dtd.promise;
      }
    };
  })
  .service('Ynu', function(){
    return {
      AppId: '944c4890-a848-44b0-b1d7-a50217cfd405'
    };
  });
