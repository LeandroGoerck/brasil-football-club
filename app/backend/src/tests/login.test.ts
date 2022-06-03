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


chai.use(chaiHttp);

const { expect } = chai;

describe('PUT /login', () => {

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
    
      it('Aprove login when information is correct', async () => {
        const response = await chai.request(app).post('/login')
        .send({ email: 'admin@admin.com', password: 'secret_admin' });
        expect(response.body.user).to.be.deep.equal({ id: 1, username: 'Admin', role: 'admin', email: 'admin@admin.com' });
      });

    });

    describe('In case of fail', () => {
      before(async () => {
        sinon.stub(UsersModel, "findOne").resolves(null);
      });
    
      after(()=>{
        (UsersModel.findOne as sinon.SinonStub).restore();
      });

      it('Deny login when email and password are wrong', async () => {
        const response = await chai.request(app)
        .post('/login')
        .send({ email: 'wrong@email.com', password: 'wrong_secret123' });
        expect(response.body).to.be.deep.equal({ message: "Incorrect email or password" });
        expect(response.status).to.be.deep.equal(401);
      });

      it('Deny login when sent empty email', async () => {
        const response = await chai.request(app).post('/login')
        .send({ email: '', password: 'wrong_secret' });
        expect(response.body).to.be.deep.equal({ message: "All fields must be filled" });
        expect(response.status).to.be.deep.equal(400);
      });

      it('Deny login when sent empty password', async () => {
        const response = await chai.request(app).post('/login')
        .send({ email: '', password: '' });
        expect(response.body).to.be.deep.equal({ message: "All fields must be filled" });
        expect(response.status).to.be.deep.equal(400);
      });

      it('Deny login when email is correct but password is wrong', async () => {
        const response = await chai.request(app).post('/login')
        .send({ email: 'admin@admin.com', password: 'wrong_secret' });
        expect(response.body).to.be.deep.equal({ message: "Incorrect email or password" });
        expect(response.status).to.be.deep.equal(401);
      });
    })
});
});

// describe('/login/validate', () => {
//   describe('in case of succes', () => {
//     before(async () => {
//       sinon.stub(UsersModel, "findOne").resolves(UsersMock as UsersModel);
//       sinon.stub(auth, "checkToken").resolves('admin');
//     });
  
//     after(()=>{
//       (UsersModel.findOne as sinon.SinonStub).restore();
//       (auth.checkToken as sinon.SinonStub).restore();
//     });

//     it('returns admin if the user role is admin', async () => {
//       const response = await chai.request(app).post('/login/validate')
//         .set('authorization', 'superTokenString').send();
//       expect(response.body).to.be.deep.equal("admin");
//       expect(response.status).to.be.deep.equal(200);
//     });

//   })
//   // describe('in case of fail', () => {

//   // })
// });