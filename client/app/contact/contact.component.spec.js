'use strict';

describe('Component: ContactComponent', function() {
  // load the controller's module
  beforeEach(module('materialCrudMongoApp.contact'));

  var ContactComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    ContactComponent = $componentController('contact', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
