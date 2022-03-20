/* eslint-disable no-undef */
import { expect } from 'chai';
import request from 'supertest';
import app from '../../app';

describe('Fee API', () => {
  describe('Fee setup', () => {
    it('should save fee setup successfully', (done) => {
      request(app)
        .post('/api/v1/fee')
        .set('Accept', 'application/json')
        .send({
          FeeConfigurationSpec: `LNPY1221 NGN * *(*) : APPLY PERC 1.4\nLNPY1222 NGN INTL CREDIT-CARD(VISA) : APPLY PERC 5.0\nLNPY1223 NGN LOCL CREDIT-CARD(*) : APPLY FLAT_PERC 50:1.4\nLNPY1224 NGN * BANK-ACCOUNT(*) : APPLY FLAT 100\nLNPY1225 NGN * USSD(MTN) : APPLY PERC 0.55`,
        })
        .end((req, res) => {
          expect(res.statusCode).to.be.equal(200);
          expect(res.body.code).to.be.equal(200);
          expect(res.body.message).to.be.equal('Fees setup saved successfully');
          done();
        });
    });

    it('should return error for missing fields', (done) => {
      request(app)
        .post('/api/v1/fee')
        .set('Accept', 'application/json')
        .send({
          FeeConfigurationpec: `LNPY1221 NGN * *(*) : APPLY PERC 1.4\nLNPY1222 NGN INTL CREDIT-CARD(VISA) : APPLY PERC 5.0\nLNPY1223 NGN LOCL CREDIT-CARD(*) : APPLY FLAT_PERC 50:1.4\nLNPY1224 NGN * BANK-ACCOUNT(*) : APPLY FLAT 100\nLNPY1225 NGN * USSD(MTN) : APPLY PERC 0.55`,
        })
        .end((req, res) => {
          expect(res.statusCode).to.be.equal(400);
          expect(res.body.code).to.be.equal(400);
          done();
        });
    });

    it('should return error for missing feeId', (done) => {
      request(app)
        .post('/api/v1/fee')
        .set('Accept', 'application/json')
        .send({
          FeeConfigurationSpec: `NGN * *(*) : APPLY PERC 1.4\nLNPY1222 NGN INTL CREDIT-CARD(VISA) : APPLY PERC 5.0\nLNPY1223 NGN LOCL CREDIT-CARD(*) : APPLY FLAT_PERC 50:1.4\nLNPY1224 NGN * BANK-ACCOUNT(*) : APPLY FLAT 100\nLNPY1225 NGN * USSD(MTN) : APPLY PERC 0.55`,
        })
        .end((req, res) => {
          console.log('errr>>>', res.body);
          expect(res.statusCode).to.be.equal(400);
          expect(res.body.code).to.be.equal(400);
          done();
        });
    });

    it('should return error for missing feeLocale', (done) => {
      request(app)
        .post('/api/v1/fee')
        .set('Accept', 'application/json')
        .send({
          FeeConfigurationSpec: `LNPY1221 NGN * *(*) : APPLY PERC 1.4\nLNPY1222 NGN INTL CREDIT-CARD(VISA) : APPLY PERC 5.0\nLNPY1223 NGN CREDIT-CARD(*) : APPLY FLAT_PERC 50:1.4\nLNPY1224 NGN * BANK-ACCOUNT(*) : APPLY FLAT 100\nLNPY1225 NGN * USSD(MTN) : APPLY PERC 0.55`,
        })
        .end((req, res) => {
          expect(res.statusCode).to.be.equal(400);
          expect(res.body.code).to.be.equal(400);
          done();
        });
    });
    
    it('should return error for missing feeType', (done) => {
      request(app)
        .post('/api/v1/fee')
        .set('Accept', 'application/json')
        .send({
          FeeConfigurationSpec: `LNPY1221 NGN * *(*) : APPLY PERC 1.4\nLNPY1222 NGN INTL CREDIT-CARD(VISA) : APPLY 5.0\nLNPY1223 NGN LOCL CREDIT-CARD(*) : APPLY FLAT_PERC 50:1.4\nLNPY1224 NGN * BANK-ACCOUNT(*) : APPLY FLAT 100\nLNPY1225 NGN * USSD(MTN) : APPLY PERC 0.55`,
        })
        .end((req, res) => {
          expect(res.statusCode).to.be.equal(400);
          expect(res.body.code).to.be.equal(400);
          done();
        });
    });
    
    it('should return error for missing feeValue', (done) => {
      request(app)
        .post('/api/v1/fee')
        .set('Accept', 'application/json')
        .send({
          FeeConfigurationSpec: `LNPY1221 NGN * *(*) : APPLY PERC 1.4\nLNPY1222 NGN INTL CREDIT-CARD(VISA) : APPLY PERC 5.0\nLNPY1223 NGN LOCL CREDIT-CARD(*) : APPLY FLAT_PERC\nLNPY1224 NGN * BANK-ACCOUNT(*) : APPLY FLAT 100\nLNPY1225 NGN * USSD(MTN) : APPLY PERC 0.55`,
        })
        .end((req, res) => {
          expect(res.statusCode).to.be.equal(400);
          expect(res.body.code).to.be.equal(400);
          done();
        });
    });

    it('should return error for missing feeEntityName', (done) => {
      request(app)
        .post('/api/v1/fee')
        .set('Accept', 'application/json')
        .send({
          FeeConfigurationSpec: `LNPY1221 NGN * *(*) : APPLY PERC 1.4\nLNPY1222 NGN INTL CREDIT-CARD(VISA) : APPLY PERC 5.0\nLNPY1223 NGN LOCL CREDIT-CARD(*) : APPLY FLAT_PERC 50:1.4\nLNPY1224 NGN * BANK-ACCOUNT(*) : APPLY FLAT 100\nLNPY1225 NGN * (MTN) : APPLY PERC 0.55`,
        })
        .end((req, res) => {
          expect(res.statusCode).to.be.equal(400);
          expect(res.body.code).to.be.equal(400);
          done();
        });
    });

    it('should return error for missing feeId', (done) => {
      request(app)
        .post('/api/v1/fee')
        .set('Accept', 'application/json')
        .send({
          FeeConfigurationSpec: `LNPY1221 NGN * *(*) : APPLY PERC 1.4\nLNPY1222 NGN INTL CREDIT-CARD(VISA) : APPLY PERC 5.0\nLNPY1223 NGN LOCL CREDIT-CARD(*) : APPLY FLAT_PERC 50:1.4\n NGN * BANK-ACCOUNT(*) : APPLY FLAT 100\nLNPY1225 NGN * USSD(MTN) : APPLY PERC 0.55`,
        })
        .end((req, res) => {
          expect(res.statusCode).to.be.equal(400);
          expect(res.body.code).to.be.equal(400);
          done();
        });
    });

    it('should return error for missing feeCurrency', (done) => {
      request(app)
        .post('/api/v1/fee')
        .set('Accept', 'application/json')
        .send({
          FeeConfigurationSpec: `LNPY1221 NGN * *(*) : APPLY PERC 1.4\nLNPY1222 NGN INTL CREDIT-CARD(VISA) : APPLY PERC 5.0\nLNPY1223 NGN LOCL CREDIT-CARD(*) : APPLY FLAT_PERC 50:1.4\nLNPY1224  * BANK-ACCOUNT(*) : APPLY FLAT 100\nLNPY1225 NGN * USSD(MTN) : APPLY PERC 0.55`,
        })
        .end((req, res) => {
          expect(res.statusCode).to.be.equal(400);
          expect(res.body.code).to.be.equal(400);
          done();
        });
    });

    it('should return error for missing feeLocale', (done) => {
      request(app)
        .post('/api/v1/fee')
        .set('Accept', 'application/json')
        .send({
          FeeConfigurationSpec: `LNPY1221 NGN * *(*) : APPLY PERC 1.4\nLNPY1222 NGN INTL CREDIT-CARD(VISA) : APPLY PERC 5.0\nLNPY1223 NGN  CREDIT-CARD(*) : APPLY FLAT_PERC 50:1.4\nLNPY1224 NGN * BANK-ACCOUNT(*) : APPLY FLAT 100\nLNPY1225 NGN * USSD(MTN) : APPLY PERC 0.55`,
        })
        .end((req, res) => {
          expect(res.statusCode).to.be.equal(400);
          expect(res.body.code).to.be.equal(400);
          done();
        });
    });

    it('should return error for missing feeType', (done) => {
      request(app)
        .post('/api/v1/fee')
        .set('Accept', 'application/json')
        .send({
          FeeConfigurationSpec: `LNPY1221 NGN * *(*) : APPLY PERC 1.4\nLNPY1222 NGN INTL CREDIT-CARD(VISA) : APPLY  5.0\nLNPY1223 NGN LOCL CREDIT-CARD(*) : APPLY FLAT_PERC 50:1.4\nLNPY1224 NGN * BANK-ACCOUNT(*) : APPLY FLAT 100\nLNPY1225 NGN * USSD(MTN) : APPLY PERC 0.55`,
        })
        .end((req, res) => {
          expect(res.statusCode).to.be.equal(400);
          expect(res.body.code).to.be.equal(400);
          done();
        });
    });
  });
});
