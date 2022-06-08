import * as sinon from 'sinon';
import * as chai from 'chai';
import { before, after } from 'mocha'
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import MatchesModel from '../database/models/MatchesModel';

import { matchesNotInProgressModelMock } from './mocks/matchesNotInProgressModelMock';

import IMatch from '../interfaces/IMatch'

chai.use(chaiHttp);

const { expect } = chai;

describe('GET /leaderboard/home', () => {

  describe('Testing / endpoint', () => {
    describe('In case of success', () => {
      before(async () => {
        sinon.stub(MatchesModel, 'findAll').resolves(matchesNotInProgressModelMock as Array<IMatch>);
      });
    
      after(()=>{
        (MatchesModel.findAll as sinon.SinonStub).restore();
      });
    
      it('returns objects with all the right keys', async () => {
        const response = await chai.request(app).get('/leaderboard/home');
        response.body.forEach((element: IMatch) => {
          expect(element).to.have.all.keys(
            'efficiency',
            'goalsBalance',
            'goalsFavor',
            'goalsOwn',
            'name',
            'totalDraws',
            'totalGames',
            'totalLosses',
            'totalPoints',
            'totalVictories');
        });
      });
    });
  });
});

