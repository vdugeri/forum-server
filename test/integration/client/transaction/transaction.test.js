import "babel-polyfill";
import chai from "chai";
import chaiHttp from "chai-http";

chai.use(chaiHttp);

import { expect } from "chai";

import Transaction from "../../../../src/api/client/models/transaction.model";
import app from "../../../../src/server";

let transaction = null;
const endpoint = "/api/v1/transactions";

describe("Transaction controller", () => {
  beforeEach(async () => {
    transaction = new Transaction({
      amount: 3000,
      transactionRef: "xd56df",
      email: "user@example.com",
      paymentMethod: "CASH"
    });
    await transaction.save();
  });

  afterEach(async () => {
    await Transaction.deleteMany({});
  });

  describe("GET /transactions", () => {
    it("should get all transactions", done => {
      chai
        .request(app)
        .get(endpoint)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.transactions).to.not.be.null;
          expect(res.body.transactions).to.be.instanceOf(Array);
          done();
        });
    });
  });
  describe("POST /transactions", () => {
    it("should create a transaction", done => {
      chai
        .request(app)
        .post(endpoint)
        .send(transaction)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.error).to.be.undefined;
          expect(res.body.status).to.eq("success");
          expect(res.body.transaction).to.not.be.null;
          expect(res.body.transaction.paymentMethod).to.eq("CASH");
          done();
        });
    });
    it("should fail to create a transaction with invalid request body", done => {
      chai
        .request(app)
        .post(endpoint)
        .send({})
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.eq("error");
          expect(res.body.error.email).to.not.be.undefined;
          expect(res.body.error.email.message).to.eq("Email cannot be blank");
          done();
        });
    });
  });
  describe("GET /transactions/:id", () => {
    it("should fetch a transaction by id", done => {
      chai
        .request(app)
        .get(`${endpoint}/${transaction.id}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.error).to.be.undefined;
          expect(res.body.transaction).to.not.be.undefined;
          expect(res.body.transaction._id).to.eq(transaction.id);
          done();
        });
    });
    it("should return a 404 for an invalid id", done => {
      chai
        .request(app)
        .get(`${endpoint}/5d668d230641ec27c2d832fb`)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body.status).to.eq("error");
          done();
        });
    });
  });
  describe("PUT /transactions/:id", () => {
    it("should update a transaction", done => {
      transaction.amount = 10000;

      chai
        .request(app)
        .put(`${endpoint}/${transaction.id}`)
        .send(transaction)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.status).to.eq("success");
          expect(res.body.transaction.amount).to.eq(10000);
          done();
        });
    });
    it("should fail to update a transaction with an invalid id", done => {
      chai
        .request(app)
        .put(`${endpoint}/5d668d230641ec27c2d832fb`)
        .send(transaction)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body.status).to.eq("error");
          done();
        });
    });
  });
  describe("DELETE /transactions:id", () => {
    it("should delete a transaction using the id", done => {
      chai
        .request(app)
        .delete(`${endpoint}/${transaction.id}`)
        .end((err, res) => {
          expect(res).to.have.status(204);
          done();
        });
    });
  });
});
