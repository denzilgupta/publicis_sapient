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

describe('Creating a new CC document', () => {

    describe('Correct details', (done) => {
        it('API should return a boolean "true" success flag', (done) => {
            server
                .post('/api/credit-card/create')
                .send({
                    "name": "denzil test",
                    "card_number": 4129708163872472,
                    "limit": 2019
                })
                .expect('Content-type', /json/)
                .expect(201)
                .end((error, response) => {
                    response.status.should.equal(201);
                    response.body.success.should.equal(true);
                    done();
                });
        });
    });

    describe('Incorrect details', (done) => {
        it('API should return a boolean "false" success flag', (done) => {
            server
                .post('/api/credit-card/create')
                .send({
                    "name": "denzil test",
                    "card_number": 9182736455463738,
                    "limit": 3050
                })
                .expect('Content-type', /json/)
                .expect(400)
                .end((error, response) => {
                    response.status.should.equal(400);
                    response.body.error.should.equal("Please enter a valid card number.");
                    response.body.success.should.equal(false);
                    done();
                });
        });
    });
});