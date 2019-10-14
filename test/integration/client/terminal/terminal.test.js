import "babel-polyfill";
import chai from "chai";
import chaiHttp from "chai-http";
import mongoose from "mongoose";

chai.use(chaiHttp);

import { expect } from "chai";

import app from "../../../../src/server";
import Terminal from "../../../../src/api/client/models/terminal.model";
import { fail } from "assert";

let terminal;
let endpoint = "/api/v1/terminals";

describe("TerminalController", () => {
  beforeEach(async () => {
    try {
      terminal = new Terminal({
        city: "Abuja",
        location: "Idu"
      });
      await terminal.save();
    } catch (error) {
      fail();
    }
  });

  afterEach(async () => {
    await Terminal.deleteMany({});
  });

  describe("GET /terminals", () => {
    it("should get all terminals", done => {
      chai
        .request(app)
        .get(endpoint)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body.terminals).to.not.be.null;
          expect(res.body.terminals).to.be.instanceOf(Array);
          expect(res.body.terminals).to.have.length.greaterThan(0);
          done();
        });
    });
  });

  describe("POST  /terminals", () => {
    it("should create a terminal", done => {
      chai
        .request(app)
        .post(endpoint)
        .send({
          city: "Abuja",
          location: "Kubwa"
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(201);
          expect(res.body.terminal).to.not.be.null;
          expect(res.body.terminal.location).to.eq("Kubwa");
          done();
        });
    });
    it("should return an error for invalid request body", done => {
      chai
        .request(app)
        .post(endpoint)
        .send({})
        .end((err, res) => {
          expect(res).to.have.status(500);
          expect(res.body.error).to.not.be.null;
          done();
        });
    });
  });

  describe("GET /terminals/:id", () => {
    it("should get a terminal by id", done => {
      chai
        .request(app)
        .get(`${endpoint}/${terminal.id}`)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res.body.terminal).to.not.be.null;
          expect(res.body.terminal._id).to.eq(terminal.id);
          done();
        });
    });
    it("should fail with 404 for invalid terminal id", done => {
      chai
        .request(app)
        .get(`${endpoint}/5d63be55d78b243ad6feb5f8`)
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  });
  describe("PUT /terminals/:id", () => {
    it("should update a terminal", done => {
      chai
        .request(app)
        .put(`${endpoint}/${terminal.id}`)
        .send({ location: "Kubwa", city: "Abuja" })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body.terminal.location).to.eq("Kubwa");
          done();
        });
    });
    it("should fail to update terminal with invalid id", done => {
      chai
        .request(app)
        .put(`${endpoint}/5d63be55d78b243ad6feb5f8`)
        .send(terminal)
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  });
  describe("DELETE /terminals/:id", () => {
    it("should delete a terminal with id", done => {
      chai
        .request(app)
        .delete(`${endpoint}/${terminal.id}`)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(204);
          done();
        });
    });
  });
});
