'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Novicetree = mongoose.model('Novicetree'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  novicetree;

/**
 * Novicetree routes tests
 */
describe('Novicetree CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new Novicetree
    user.save(function () {
      novicetree = {
        name: 'Novicetree name'
      };

      done();
    });
  });

  it('should be able to save a Novicetree if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Novicetree
        agent.post('/api/novicetrees')
          .send(novicetree)
          .expect(200)
          .end(function (novicetreeSaveErr, novicetreeSaveRes) {
            // Handle Novicetree save error
            if (novicetreeSaveErr) {
              return done(novicetreeSaveErr);
            }

            // Get a list of Novicetrees
            agent.get('/api/novicetrees')
              .end(function (novicetreesGetErr, novicetreesGetRes) {
                // Handle Novicetrees save error
                if (novicetreesGetErr) {
                  return done(novicetreesGetErr);
                }

                // Get Novicetrees list
                var novicetrees = novicetreesGetRes.body;

                // Set assertions
                (novicetrees[0].user._id).should.equal(userId);
                (novicetrees[0].name).should.match('Novicetree name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Novicetree if not logged in', function (done) {
    agent.post('/api/novicetrees')
      .send(novicetree)
      .expect(403)
      .end(function (novicetreeSaveErr, novicetreeSaveRes) {
        // Call the assertion callback
        done(novicetreeSaveErr);
      });
  });

  it('should not be able to save an Novicetree if no name is provided', function (done) {
    // Invalidate name field
    novicetree.name = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Novicetree
        agent.post('/api/novicetrees')
          .send(novicetree)
          .expect(400)
          .end(function (novicetreeSaveErr, novicetreeSaveRes) {
            // Set message assertion
            (novicetreeSaveRes.body.message).should.match('Please fill Novicetree name');

            // Handle Novicetree save error
            done(novicetreeSaveErr);
          });
      });
  });

  it('should be able to update an Novicetree if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Novicetree
        agent.post('/api/novicetrees')
          .send(novicetree)
          .expect(200)
          .end(function (novicetreeSaveErr, novicetreeSaveRes) {
            // Handle Novicetree save error
            if (novicetreeSaveErr) {
              return done(novicetreeSaveErr);
            }

            // Update Novicetree name
            novicetree.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Novicetree
            agent.put('/api/novicetrees/' + novicetreeSaveRes.body._id)
              .send(novicetree)
              .expect(200)
              .end(function (novicetreeUpdateErr, novicetreeUpdateRes) {
                // Handle Novicetree update error
                if (novicetreeUpdateErr) {
                  return done(novicetreeUpdateErr);
                }

                // Set assertions
                (novicetreeUpdateRes.body._id).should.equal(novicetreeSaveRes.body._id);
                (novicetreeUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Novicetrees if not signed in', function (done) {
    // Create new Novicetree model instance
    var novicetreeObj = new Novicetree(novicetree);

    // Save the novicetree
    novicetreeObj.save(function () {
      // Request Novicetrees
      request(app).get('/api/novicetrees')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Novicetree if not signed in', function (done) {
    // Create new Novicetree model instance
    var novicetreeObj = new Novicetree(novicetree);

    // Save the Novicetree
    novicetreeObj.save(function () {
      request(app).get('/api/novicetrees/' + novicetreeObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', novicetree.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Novicetree with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/novicetrees/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Novicetree is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Novicetree which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Novicetree
    request(app).get('/api/novicetrees/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Novicetree with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Novicetree if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Novicetree
        agent.post('/api/novicetrees')
          .send(novicetree)
          .expect(200)
          .end(function (novicetreeSaveErr, novicetreeSaveRes) {
            // Handle Novicetree save error
            if (novicetreeSaveErr) {
              return done(novicetreeSaveErr);
            }

            // Delete an existing Novicetree
            agent.delete('/api/novicetrees/' + novicetreeSaveRes.body._id)
              .send(novicetree)
              .expect(200)
              .end(function (novicetreeDeleteErr, novicetreeDeleteRes) {
                // Handle novicetree error error
                if (novicetreeDeleteErr) {
                  return done(novicetreeDeleteErr);
                }

                // Set assertions
                (novicetreeDeleteRes.body._id).should.equal(novicetreeSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Novicetree if not signed in', function (done) {
    // Set Novicetree user
    novicetree.user = user;

    // Create new Novicetree model instance
    var novicetreeObj = new Novicetree(novicetree);

    // Save the Novicetree
    novicetreeObj.save(function () {
      // Try deleting Novicetree
      request(app).delete('/api/novicetrees/' + novicetreeObj._id)
        .expect(403)
        .end(function (novicetreeDeleteErr, novicetreeDeleteRes) {
          // Set message assertion
          (novicetreeDeleteRes.body.message).should.match('User is not authorized');

          // Handle Novicetree error error
          done(novicetreeDeleteErr);
        });

    });
  });

  it('should be able to get a single Novicetree that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      username: 'orphan',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local'
    });

    _orphan.save(function (err, orphan) {
      // Handle save error
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var orphanId = orphan._id;

          // Save a new Novicetree
          agent.post('/api/novicetrees')
            .send(novicetree)
            .expect(200)
            .end(function (novicetreeSaveErr, novicetreeSaveRes) {
              // Handle Novicetree save error
              if (novicetreeSaveErr) {
                return done(novicetreeSaveErr);
              }

              // Set assertions on new Novicetree
              (novicetreeSaveRes.body.name).should.equal(novicetree.name);
              should.exist(novicetreeSaveRes.body.user);
              should.equal(novicetreeSaveRes.body.user._id, orphanId);

              // force the Novicetree to have an orphaned user reference
              orphan.remove(function () {
                // now signin with valid user
                agent.post('/api/auth/signin')
                  .send(credentials)
                  .expect(200)
                  .end(function (err, res) {
                    // Handle signin error
                    if (err) {
                      return done(err);
                    }

                    // Get the Novicetree
                    agent.get('/api/novicetrees/' + novicetreeSaveRes.body._id)
                      .expect(200)
                      .end(function (novicetreeInfoErr, novicetreeInfoRes) {
                        // Handle Novicetree error
                        if (novicetreeInfoErr) {
                          return done(novicetreeInfoErr);
                        }

                        // Set assertions
                        (novicetreeInfoRes.body._id).should.equal(novicetreeSaveRes.body._id);
                        (novicetreeInfoRes.body.name).should.equal(novicetree.name);
                        should.equal(novicetreeInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Novicetree.remove().exec(done);
    });
  });
});
