// -- Third party imports -- //
const chai = require('chai');
const expect = require('chai').expect;
const chaiHttp = require('chai-http');

// -- Local imports -- //
const app = require('..');

chai.use(chaiHttp);

describe('Stall actions', () => {
    it('Creating a stall when not logged in should fail', (done) => {
        chai.request(app)
            .post('/api/v1/stall')
            .send({})
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(403);
                done();
            });
    });
});


