'use strict';

/**
 * @ngdoc overview
 * @name userManageApp
 * @description
 * # userManageApp
 *
 * Main module of the application.
 */
angular
  .module('userManageApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'naguModule'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/role/list.html',
        controller: 'RoleListCtrl'
      })
      .when('/role/list', {
        templateUrl: 'views/role/list.html',
        controller: 'RoleListCtrl'
      })
      .when('/user/list/:appId', {
        templateUrl: 'views/user/list.html',
        controller: 'UserListCtrl'
      })
      .when('/user/create', {
        templateUrl: 'views/user/create.html',
        controller: 'UserCreateCtrl'
      })
      .when('/user/create/ynu', {
        templateUrl: 'views/user/create/ynu.html',
        controller: 'UserCreateYnuCtrl'
      })
      .when('/user/edit/ynu/:userId', {
        templateUrl: 'views/user/create/ynu.html',
        controller: 'UserEditYnuCtrl'
      })
      .when('/user/login', {
        templateUrl: 'views/user/login.html',
        controller: 'UserLoginCtrl'
      })
      .when('/user/profile/:userId', {
        templateUrl: 'views/user/profile.html',
        controller: 'UserProfileCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
