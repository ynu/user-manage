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
      .when('/user/list', {
        templateUrl: 'views/user/list.html',
        controller: 'UserListCtrl'
      })
      .when('/user/create', {
        templateUrl: 'views/user/create.html',
        controller: 'UserCreateCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
