var supertest = require('supertest');
var should = require('should');

var server = supertest.agent('http://localhost:5000');

describe('test api', () => {
    it('test api should return a success message', (done) => {
        server
            .get('/api/test')
            .expect('Content-type', /json/)
            .expect(200)
            .end((error, response) => {
                response.status.should.equal(200);
                response.body.data.should.equal("Test API is working.");
                response.body.success.should.equal(true);
                done();
            });
    });
});