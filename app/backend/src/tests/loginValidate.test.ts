import * as bcryptjs from 'bcryptjs';
import * as sinon from 'sinon';
import * as chai from 'chai';
import { before, after } from 'mocha'
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import UsersModel from '../database/models/UsersModel';
import auth from '../services/auth';

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
      sinon.stub(UsersModel, 'findOne').resolves(UsersMock as UsersModel);
      sinon.stub(auth, 'checkToken').resolves('admin');
    });
  
    after(()=>{
      (UsersModel.findOne as sinon.SinonStub).restore();
      (auth.checkToken as sinon.SinonStub).restore();
    });

    it('returns the role :admin: when an valid admin token is sent', async () => {
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

    it('sends :Internal server Error message: when token is invalid', async () => {
      const response = await chai.request(app).get('/login/validate').set('authorization', INVALID_TOKEN);
      expect(response.body).to.deep.equal({ message: 'Internal server Error' });
    });
  })

});
