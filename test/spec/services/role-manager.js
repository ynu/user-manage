'use strict';

describe('Service: roleManager', function () {

  // load the service's module
  beforeEach(module('appstoreApp'));

  // instantiate service
  var roleManager;
  beforeEach(inject(function (_roleManager_) {
    roleManager = _roleManager_;
  }));

  it('should do something', function () {
    expect(!!roleManager).toBe(true);
  });

});
