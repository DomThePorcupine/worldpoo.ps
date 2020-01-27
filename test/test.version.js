// -- Third party imports -- //
const chai = require('chai');
const expect = require('chai').expect;
const chaiHttp = require('chai-http');
const assert = require('assert');

// -- Local imports -- //
const app = require('..');
const version = require('../package.json').version;

chai.use(chaiHttp);

describe('Version actions', () => {
    it('Version sould return the same version as package.json', (done) => {
        chai.request(app)
            .get('/api/v1/version')
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                assert(res.body.version === version);
                done();
            });
    });
});


