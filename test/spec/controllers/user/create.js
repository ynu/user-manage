'use strict';

describe('Controller: UserCreateCtrl', function () {

  // load the controller's module
  beforeEach(module('userManageApp'));

  var UserCreateCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UserCreateCtrl = $controller('UserCreateCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
