'use strict';

describe('Controller: UserEditYnuCtrl', function () {

  // load the controller's module
  beforeEach(module('userManageApp'));

  var UserEditYnuCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UserEditYnuCtrl = $controller('UserEditYnuCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
