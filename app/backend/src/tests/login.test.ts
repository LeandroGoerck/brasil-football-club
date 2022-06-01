import * as sinon from 'sinon';
import * as chai from 'chai';
import { before, after } from 'mocha'
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import UsersModel from '../database/models/UsersModel';

import { Response } from 'superagent';

const UsersMock = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
};


chai.use(chaiHttp);

const { expect } = chai;

describe('/login', () => {

  describe('Testing / endpoint', () => {
    describe('In case of success', () => {
      before(async () => {
        sinon
          .stub(UsersModel, "findOne")
          .resolves(UsersMock as UsersModel);
      });
    
      after(()=>{
        (UsersModel.findOne as sinon.SinonStub).restore();
      });
    
      it('Approved login', async () => {
        const response = await chai.request(app).post('/login')
        .send({ email: 'admin@admin.com', password: 'secret_admin' });
        expect(response.body.user).to.be.deep
        .equal({ id: 1, username: 'Admin', role: 'admin', email: 'admin@admin.com' });
      });
    });

    
  
    
});
});