import "babel-polyfill";
import chai from "chai";
import chaiHttp from "chai-http";
import { fail } from "assert";

chai.use(chaiHttp);

import { expect } from "chai";

import Itinerary from "../../../../src/api/client/models/itinerary.model";
import Train from "../../../../src/api/client/models/train.model";
import Terminal from "../../../../src/api/client/models/terminal.model";

import app from "../../../../src/server";

let itinerary;
let kaduna = new Terminal({ city: "kaduna", location: "Ringim" });
let abuja = new Terminal({ city: "Abuja", location: "Idu" });
let kubwa = new Terminal({ city: "Abuja", location: "kubwa" });
let zuba = new Terminal({ city: "Abuja", location: "Zuba" });
let ringim = new Terminal({ city: "Kaduna", location: "ringim" });
const train = new Train({
  model: "TRX45DK",
  capacity: 500,
  available: false,
  hasFirstClass: true,
  firstClassSeats: 24,
  economySeats: 440
});

const endpoint = "/api/v1/itineraries";

describe("ItineraryController", () => {
  beforeEach(async () => {
    try {
      itinerary = new Itinerary({
        train,
        stops: [kubwa, zuba, ringim],
        origin: abuja,
        destination: kaduna,
        departureTime: "6:30am",
        departureDate: "30-08-2019"
      });
      await itinerary.save();
    } catch (error) {
      console.log(error.message);
      fail();
    }
  });

  afterEach(async () => {
    await Itinerary.deleteMany({});
  });

  describe("GET /itineraries", () => {
    it("should fetch all itineraries", done => {
      chai
        .request(app)
        .get(endpoint)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.not.be.null;
          expect(res.body.itineraries).to.be.instanceOf(Array);
          expect(res.body.itineraries).to.have.length.greaterThan(0);
          done();
        });
    });
  });
  describe("POST /itineraries", () => {
    it("should create an itinerary", done => {
      chai
        .request(app)
        .post(endpoint)
        .send(itinerary)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(201);
          expect(res.body.itinerary).to.not.be.null;
          done();
        });
    });
    it("should fail for invalid request data", done => {
      chai
        .request(app)
        .post(endpoint)
        .send({})
        .end((err, res) => {
          expect(res.body.status).to.eq("error");
          done();
        });
    });
  });

  describe("GET /itineraries/:id", () => {
    it("should fetch an itinerary by id", done => {
      chai
        .request(app)
        .get(`${endpoint}/${itinerary.id}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.itinerary).to.not.be.null;
          expect(res.body.itinerary._id).to.eq(itinerary.id);
          done();
        });
    });
    it("should return a 404 for invalid id", done => {
      chai
        .request(app)
        .get(`${endpoint}/5d643b8a77f07645897fc8f0`)
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  });
  describe("PUT /itineraries/:id", () => {
    it("should update an itinerary", done => {
      itinerary.departureTime = "7:30AM";
      chai
        .request(app)
        .put(`${endpoint}/${itinerary.id}`)
        .send(itinerary)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.itinerary).to.not.be.undefined;
          expect(res.body.itinerary._id).to.eq(itinerary.id);
          expect(res.body.itinerary.departureTime).to.eq("7:30AM");
          done();
        });
    });
    it("should return a 404 for an invalid id", done => {
      chai
        .request(app)
        .put(`${endpoint}/5d643b8a77f07645897fc8f0`)
        .send(itinerary)
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  });
  describe("DELETE /itineraries", () => {
    it("should delete an itinerary by id", done => {
      chai
        .request(app)
        .delete(`${endpoint}/${itinerary.id}`)
        .end((err, res) => {
          expect(res).to.have.status(204);
          done();
        });
    });
  });
});
