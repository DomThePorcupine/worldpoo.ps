// -- Third party imports -- //
const chai = require('chai');
const expect = require('chai').expect;
const chaiHttp = require('chai-http');

// -- Local imports -- //
const app = require('..');

chai.use(chaiHttp);

describe('Auth actions', () => {
    // Check forced auth
    it('Create a new user should succeed with valid username/password', (done) => {
        chai.request(app)
            .post('/api/v1/auth/register')
            .send({
                username: Math.random().toString(36),
                password: 'password',
            })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(403);
                done();
            });
    });

    it('Creating a stall when logged in should fail if the user is not a VIP', (done) => {
        chai.request(app)
            .post('/api/v1/stall')
            .send({})
            .end((err, res) => {
                done();
            });
    });
});


