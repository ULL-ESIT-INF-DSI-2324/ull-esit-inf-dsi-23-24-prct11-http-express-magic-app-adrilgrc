import "mocha";
import { expect } from "chai";
import request from "request";

describe('Server', () => {
  context('GET /cards requests testing', () => {
    it('Tesing GET request. Bad use: Using without providing username', (done) => {
      request.get({ url: 'http://localhost:3000/cards', json: true }, (error: Error, response) => {
        expect(response.body.status).to.equal('[ERROR]');
        expect(response.body.message).to.equal('User is required');
        done();
      });
    });
    it('Tesing GET request. Bad use: Using without providing id', (done) => {
      request.get({ url: 'http://localhost:3000/cards?user=test', json: true }, (error: Error, response) => {
        expect(response.body.status).to.equal('[ERROR]');
        expect(response.body.message).to.equal('Id is required');
        done();
      });
    });
    it('Tesing GET request. Bad use: Non existing card', (done) => {
      request.get({ url: 'http://localhost:3000/cards?user=test&id=999', json: true }, (error: Error, response) => {
        expect(response.body.status).to.equal('[ERROR]');
        expect(response.body.message).to.equal('Card not found');
        done();
      });
    });
	});
});