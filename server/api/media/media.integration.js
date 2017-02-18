'use strict';

var app = require('../..');
import request from 'supertest';

var newMedia;

describe('Media API:', function() {
  describe('GET /media', function() {
    var medias;

    beforeEach(function(done) {
      request(app)
        .get('/media')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          medias = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      medias.should.be.instanceOf(Array);
    });
  });

  describe('POST /media', function() {
    beforeEach(function(done) {
      request(app)
        .post('/media')
        .send({
          name: 'New Media',
          info: 'This is the brand new media!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newMedia = res.body;
          done();
        });
    });

    it('should respond with the newly created media', function() {
      newMedia.name.should.equal('New Media');
      newMedia.info.should.equal('This is the brand new media!!!');
    });
  });

  describe('GET /media/:id', function() {
    var media;

    beforeEach(function(done) {
      request(app)
        .get(`/media/${newMedia._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          media = res.body;
          done();
        });
    });

    afterEach(function() {
      media = {};
    });

    it('should respond with the requested media', function() {
      media.name.should.equal('New Media');
      media.info.should.equal('This is the brand new media!!!');
    });
  });

  describe('PUT /media/:id', function() {
    var updatedMedia;

    beforeEach(function(done) {
      request(app)
        .put(`/media/${newMedia._id}`)
        .send({
          name: 'Updated Media',
          info: 'This is the updated media!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedMedia = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedMedia = {};
    });

    it('should respond with the original media', function() {
      updatedMedia.name.should.equal('New Media');
      updatedMedia.info.should.equal('This is the brand new media!!!');
    });

    it('should respond with the updated media on a subsequent GET', function(done) {
      request(app)
        .get(`/media/${newMedia._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let media = res.body;

          media.name.should.equal('Updated Media');
          media.info.should.equal('This is the updated media!!!');

          done();
        });
    });
  });

  describe('PATCH /media/:id', function() {
    var patchedMedia;

    beforeEach(function(done) {
      request(app)
        .patch(`/media/${newMedia._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Media' },
          { op: 'replace', path: '/info', value: 'This is the patched media!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedMedia = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedMedia = {};
    });

    it('should respond with the patched media', function() {
      patchedMedia.name.should.equal('Patched Media');
      patchedMedia.info.should.equal('This is the patched media!!!');
    });
  });

  describe('DELETE /media/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/media/${newMedia._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when media does not exist', function(done) {
      request(app)
        .delete(`/media/${newMedia._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
