'use strict';

var app = require('../..');
import request from 'supertest';

var newMovie;

describe('Movie API:', function() {
  describe('GET /api/movies', function() {
    var movies;

    beforeEach(function(done) {
      request(app)
        .get('/api/movies')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          movies = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      movies.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/movies', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/movies')
        .send({
          name: 'New Movie',
          info: 'This is the brand new movie!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newMovie = res.body;
          done();
        });
    });

    it('should respond with the newly created movie', function() {
      newMovie.name.should.equal('New Movie');
      newMovie.info.should.equal('This is the brand new movie!!!');
    });
  });

  describe('GET /api/movies/:id', function() {
    var movie;

    beforeEach(function(done) {
      request(app)
        .get(`/api/movies/${newMovie._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          movie = res.body;
          done();
        });
    });

    afterEach(function() {
      movie = {};
    });

    it('should respond with the requested movie', function() {
      movie.name.should.equal('New Movie');
      movie.info.should.equal('This is the brand new movie!!!');
    });
  });

  describe('PUT /api/movies/:id', function() {
    var updatedMovie;

    beforeEach(function(done) {
      request(app)
        .put(`/api/movies/${newMovie._id}`)
        .send({
          name: 'Updated Movie',
          info: 'This is the updated movie!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedMovie = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedMovie = {};
    });

    it('should respond with the original movie', function() {
      updatedMovie.name.should.equal('New Movie');
      updatedMovie.info.should.equal('This is the brand new movie!!!');
    });

    it('should respond with the updated movie on a subsequent GET', function(done) {
      request(app)
        .get(`/api/movies/${newMovie._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let movie = res.body;

          movie.name.should.equal('Updated Movie');
          movie.info.should.equal('This is the updated movie!!!');

          done();
        });
    });
  });

  describe('PATCH /api/movies/:id', function() {
    var patchedMovie;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/movies/${newMovie._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Movie' },
          { op: 'replace', path: '/info', value: 'This is the patched movie!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedMovie = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedMovie = {};
    });

    it('should respond with the patched movie', function() {
      patchedMovie.name.should.equal('Patched Movie');
      patchedMovie.info.should.equal('This is the patched movie!!!');
    });
  });

  describe('DELETE /api/movies/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/movies/${newMovie._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when movie does not exist', function(done) {
      request(app)
        .delete(`/api/movies/${newMovie._id}`)
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
