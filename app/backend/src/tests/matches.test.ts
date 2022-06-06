import * as sinon from 'sinon';
import * as chai from 'chai';
import { before, after } from 'mocha'
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import MatchesModel from '../database/models/MatchesModel';
import UsersModel from '../database/models/UsersModel';

import { matchesModelMock } from './mocks/matchesModelMock';
import { matchesInProgressModelMock } from './mocks/matchesInProgressModelMock';
import { matchesNotInProgressModelMock } from './mocks/matchesNotInProgressModelMock';
import { createdMatchModelMock } from './mocks/createdMatchModelMock';

import IMatch from '../interfaces/IMatch'
import IUser from '../interfaces/IUser'
import ICreatedMatch from '../interfaces/ICreatedMatch'
import { usersModelMock } from './mocks/usersModelMock';
import auth from '../services/auth';

const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAdXNlci5jb20iLCJwYXNzd29yZCI6InNlY3JldF91c2VyIiwiaWF0IjoxNjU0MjkxMzUxLCJleHAiOjE2NTQzNzc3NTF9.IhDQxwSHreCRiblUemIil-StJzSja05cHOqBZlW_o4Q';

chai.use(chaiHttp);

const { expect } = chai;

describe('GET /matches', () => {

  describe('Testing / endpoint', () => {
    describe('In case of success', () => {
      before(async () => {
        sinon.stub(MatchesModel, 'findAll').resolves(matchesModelMock as Array<IMatch>);
      });
    
      after(()=>{
        (MatchesModel.findAll as sinon.SinonStub).restore();
      });
    
      it('returns all matches when token is correct', async () => {
        const response = await chai.request(app).get('/matches').set('authorization', TOKEN);
        response.body.forEach((element: IMatch) => {
          expect(element).to.have.all.keys(
            'id',
            'homeTeam',
            'homeTeamGoals',
            'awayTeam',
            'awayTeamGoals',
            'inProgress',
            'teamHome',
            'teamAway');
        });
      });
    });
  });

  describe('Testing ?inProgress=true endpoint', () => {
    describe('In case of success', () => {
      before(async () => {
        sinon.stub(MatchesModel, 'findAll').resolves(matchesInProgressModelMock as Array<IMatch>);
      });
    
      after(()=>{
        (MatchesModel.findAll as sinon.SinonStub).restore();
      });
    
      it('returns all matches in progress when token is correct', async () => {
        const response = await chai.request(app).get('/matches?inProgress=true').set('authorization', TOKEN);
        response.body.forEach((element: IMatch) => {
          expect(element).to.have.all.keys(
            'id',
            'homeTeam',
            'homeTeamGoals',
            'awayTeam',
            'awayTeamGoals',
            'inProgress',
            'teamHome',
            'teamAway');
          expect(element.inProgress).to.be.deep.equal(true);
        });
      });
    });
  });

  describe('Testing ?inProgress=false endpoint', () => {
    describe('In case of success', () => {
      before(async () => {
        sinon.stub(MatchesModel, 'findAll').resolves(matchesNotInProgressModelMock as Array<IMatch>);
      });
    
      after(()=>{
        (MatchesModel.findAll as sinon.SinonStub).restore();
      });
    
      it('returns all matches not in progress when token is correct', async () => {
        const response = await chai.request(app).get('/matches?inProgress=false').set('authorization', TOKEN);
        response.body.forEach((element: IMatch) => {
          expect(element).to.have.all.keys(
            'id',
            'homeTeam',
            'homeTeamGoals',
            'awayTeam',
            'awayTeamGoals',
            'inProgress',
            'teamHome',
            'teamAway');
          expect(element.inProgress).to.be.deep.equal(false);
        });
      });
    });
  });

});



describe('POST /matches', () => {

  describe('Testing / endpoint', () => {
    describe('In case of success', () => {
      before(async () => {
        sinon.stub(MatchesModel, 'create').resolves(createdMatchModelMock as ICreatedMatch);
        sinon.stub(UsersModel, 'findOne').resolves(usersModelMock as IUser);
        sinon.stub(auth, 'checkToken').resolves('admin');
      });
    
      after(()=>{
        (MatchesModel.create as sinon.SinonStub).restore();
        (UsersModel.findOne as sinon.SinonStub).restore();
        (auth.checkToken as sinon.SinonStub).restore();
      });
    
      it('returns the created match when token is correct', async () => {
        const response = await chai.request(app).post('/matches').set('authorization', TOKEN).type('JSON').send({
        // const response = await chai.request(app).post('/matches').send({
          homeTeam: 1,
          awayTeam: 8,
          homeTeamGoals: 2,
          awayTeamGoals: 2,
          inProgress: false
        });
        expect(response.body).to.have.all.keys(
            'id',
            'homeTeam',
            'homeTeamGoals',
            'awayTeam',
            'awayTeamGoals',
            'inProgress');
        });
      });
    });
  });


describe('PATCH /matches', () => {

  describe('Testing /46/finish endpoint', () => {
    describe('In case of success', () => {
      before(async () => {
        sinon.stub(MatchesModel, 'update').resolves(undefined);
        sinon.stub(UsersModel, 'findOne').resolves(usersModelMock as IUser);
        sinon.stub(auth, 'checkToken').resolves('admin');
      });
    
      after(()=>{
        (MatchesModel.update as sinon.SinonStub).restore();
        (UsersModel.findOne as sinon.SinonStub).restore();
        (auth.checkToken as sinon.SinonStub).restore();
      });
    
      it('returns : message: finished: end status 200', async () => {
        const response = await chai.request(app).patch('/matches/46/finish').set('authorization', TOKEN).type('JSON');
        expect(response.body).to.be.deep.equal({ message: 'Finished' });
        });

      it('returns status 200', async () => {
        const response = await chai.request(app).patch('/matches/46/finish').set('authorization', TOKEN).type('JSON');
        expect(response.status).to.be.deep.equal(200);
        });

      });
    });

  describe('Testing /46 endpoint', () => {
    describe('In case of success', () => {
      before(async () => {
        sinon.stub(MatchesModel, 'update').resolves(undefined);
        sinon.stub(UsersModel, 'findOne').resolves(usersModelMock as IUser);
        sinon.stub(auth, 'checkToken').resolves('admin');
      });
    
      after(()=>{
        (MatchesModel.update as sinon.SinonStub).restore();
        (UsersModel.findOne as sinon.SinonStub).restore();
        (auth.checkToken as sinon.SinonStub).restore();
      });
    
      it('returns status 200', async () => {
        const response = await chai.request(app).patch('/matches/46').set('authorization', TOKEN).type('JSON')
        .send({
          "homeTeamGoals": 3,
          "awayTeamGoals": 11
        });
        expect(response.status).to.be.deep.equal(200);
        });
      });
    });
  });

