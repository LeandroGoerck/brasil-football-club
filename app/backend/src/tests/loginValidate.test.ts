import * as sinon from 'sinon';
import * as chai from 'chai';
import { before, after } from 'mocha'
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import UsersModel from '../database/models/UsersModel';

const UsersMock = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
};

const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAdXNlci5jb20iLCJwYXNzd29yZCI6InNlY3JldF91c2VyIiwiaWF0IjoxNjU0MjkxMzUxLCJleHAiOjE2NTQzNzc3NTF9.IhDQxwSHreCRiblUemIil-StJzSja05cHOqBZlW_o4Q';
const INVALID_TOKEN = 'XyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAdXNlci5jb20iLCJwYXNzd29yZCI6InNlY3JldF91c2VyIiwiaWF0IjoxNjU0MjkxMzUxLCJleHAiOjE2NTQzNzc3NTF9.IhDQxwSHreCRiblUemIil-StJzSja05cHOqBZlW_o4Q';

chai.use(chaiHttp);

const { expect } = chai;

describe('GET /login/validate', () => {
  describe('in case of succes', () => {
    before(async () => {
      sinon.stub(UsersModel, "findOne").resolves(UsersMock as UsersModel);
    });
  
    after(()=>{
      (UsersModel.findOne as sinon.SinonStub).restore();
    });

    it('Valid token', async () => {
      const response = await chai.request(app).get('/login/validate').set('authorization', TOKEN);
      expect(response.body).to.be.equal('admin');
    });
  })

  describe('In case of fail', () => {

    before(async () => {
      sinon.stub(UsersModel, "findOne").resolves(null);
    });
  
    after(()=>{
      (UsersModel.findOne as sinon.SinonStub).restore();
    });

    it('Invalid token', async () => {
      const response = await chai.request(app).get('/login/validate').set('authorization', INVALID_TOKEN);
      expect(response.body).to.deep.equal({ message: 'Internal server Error' });
    });
  })

});
