import "babel-polyfill";
import chai from "chai";
import chaiHttp from "chai-http";
import mongoose from "mongoose";
import app from "../../../../src/server";
import Train from "../../../../src/api/client/models/train.model";

chai.use(chaiHttp);

import { expect } from "chai";

let train;

describe("TrainController", () => {
  beforeEach(async () => {
    train = new Train({
      model: "TRX45DK",
      capacity: 500,
      available: false,
      hasFirstClass: true,
      firstClassSeats: 24,
      economySeats: 440
    });
    await train.save();
  });

  afterEach(async () => {
    await Train.deleteMany({});
  });
  describe("GET /trains", () => {
    it("should get all trains", done => {
      chai
        .request(app)
        .get("/api/v1/trains")
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.instanceOf(Object);
          done();
        });
    });
    describe("GET /trains/:id", () => {
      it("should get a train by id", done => {
        chai
          .request(app)
          .get(`/api/v1/trains/${train._id}`)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body.train).be.instanceOf(Object);
            expect(res.body.train._id).to.eq(train.id);
            done();
          });
      });
      it("should return 404 for invalid train id", done => {
        chai
          .request(app)
          .get(`/api/v1/trains/5d62d6ed9b5037324f1e2fb4`)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(404);
            done();
          });
      });
    });

    describe("POST /trains", () => {
      after(async () => {});

      it("should save a train to database", done => {
        const train = {
          model: "TRX45DK",
          capacity: 500,
          available: false,
          hasFirstClass: true,
          firstClassSeats: 24,
          economySeats: 440
        };

        chai
          .request(app)
          .post("/api/v1/trains")
          .send(train)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(201);
            expect(res.body.train.model).to.eq(train.model);
            done();
          });
      });

      it("should return error message for bad request", done => {
        chai
          .request(app)
          .post("/api/v1/trains")
          .send({})
          .end((err, res) => {
            expect(res).to.have.status(500);
            expect(res.body.status).to.eq("error");
            done();
          });
      });
    });

    describe("PUT /trains/:id", () => {
      it("should update a train", done => {
        train.model = "TRX5R";
        chai
          .request(app)
          .put(`/api/v1/trains/${train.id}`)
          .send(train)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body.train.model).to.eq("TRX5R");
            done();
          });
      });
      it("should fail to update a train that does not exist", done => {
        chai
          .request(app)
          .put("/api/v1/trains/5d63a978f814a8361c1b3f5e")
          .send(train)
          .end((err, res) => {
            expect(res).to.have.status(404);
            done();
          });
      });
    });

    describe("DELETE /trains/:id", () => {
      it("should delete a train by id", done => {
        chai
          .request(app)
          .delete(`/api/v1/trains/${train.id}`)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(204);
            done();
          });
      });
    });
  });
});
