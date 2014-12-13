'use strict';

describe('Controller: UserLoginCtrl', function () {

  // load the controller's module
  beforeEach(module('userManageApp'));

  var UserLoginCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UserLoginCtrl = $controller('UserLoginCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
