'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var mediaCtrlStub = {
  index: 'mediaCtrl.index',
  show: 'mediaCtrl.show',
  create: 'mediaCtrl.create',
  upsert: 'mediaCtrl.upsert',
  patch: 'mediaCtrl.patch',
  destroy: 'mediaCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var mediaIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './media.controller': mediaCtrlStub
});

describe('Media API Router:', function() {
  it('should return an express router instance', function() {
    mediaIndex.should.equal(routerStub);
  });

  describe('GET /media', function() {
    it('should route to media.controller.index', function() {
      routerStub.get
        .withArgs('/', 'mediaCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /media/:id', function() {
    it('should route to media.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'mediaCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /media', function() {
    it('should route to media.controller.create', function() {
      routerStub.post
        .withArgs('/', 'mediaCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /media/:id', function() {
    it('should route to media.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'mediaCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /media/:id', function() {
    it('should route to media.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'mediaCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /media/:id', function() {
    it('should route to media.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'mediaCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
