'use strict';

describe('Component: CustomerComponent', function() {
  // load the controller's module
  beforeEach(module('materialCrudMongoApp.customer'));

  var CustomerComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    CustomerComponent = $componentController('customer', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
