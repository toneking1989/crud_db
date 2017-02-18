'use strict';

var app = require('../..');
import request from 'supertest';

var newContact;

describe('Contact API:', function() {
  describe('GET /api/contacts', function() {
    var contacts;

    beforeEach(function(done) {
      request(app)
        .get('/api/contacts')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          contacts = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      contacts.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/contacts', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/contacts')
        .send({
          name: 'New Contact',
          info: 'This is the brand new contact!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newContact = res.body;
          done();
        });
    });

    it('should respond with the newly created contact', function() {
      newContact.name.should.equal('New Contact');
      newContact.info.should.equal('This is the brand new contact!!!');
    });
  });

  describe('GET /api/contacts/:id', function() {
    var contact;

    beforeEach(function(done) {
      request(app)
        .get(`/api/contacts/${newContact._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          contact = res.body;
          done();
        });
    });

    afterEach(function() {
      contact = {};
    });

    it('should respond with the requested contact', function() {
      contact.name.should.equal('New Contact');
      contact.info.should.equal('This is the brand new contact!!!');
    });
  });

  describe('PUT /api/contacts/:id', function() {
    var updatedContact;

    beforeEach(function(done) {
      request(app)
        .put(`/api/contacts/${newContact._id}`)
        .send({
          name: 'Updated Contact',
          info: 'This is the updated contact!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedContact = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedContact = {};
    });

    it('should respond with the original contact', function() {
      updatedContact.name.should.equal('New Contact');
      updatedContact.info.should.equal('This is the brand new contact!!!');
    });

    it('should respond with the updated contact on a subsequent GET', function(done) {
      request(app)
        .get(`/api/contacts/${newContact._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let contact = res.body;

          contact.name.should.equal('Updated Contact');
          contact.info.should.equal('This is the updated contact!!!');

          done();
        });
    });
  });

  describe('PATCH /api/contacts/:id', function() {
    var patchedContact;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/contacts/${newContact._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Contact' },
          { op: 'replace', path: '/info', value: 'This is the patched contact!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedContact = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedContact = {};
    });

    it('should respond with the patched contact', function() {
      patchedContact.name.should.equal('Patched Contact');
      patchedContact.info.should.equal('This is the patched contact!!!');
    });
  });

  describe('DELETE /api/contacts/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/contacts/${newContact._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when contact does not exist', function(done) {
      request(app)
        .delete(`/api/contacts/${newContact._id}`)
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
