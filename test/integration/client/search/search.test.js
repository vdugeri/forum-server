import chai from "chai";
import chaiHttp from "chai-http";

chai.use(chaiHttp);

import { expect } from "chai";

import Terminal from "../../../../src/api/client/models/terminal.model";
import Itinerary from "../../../../src/api/client/models/itinerary.model";

import app from "../../../../src/server";
import { fail } from "assert";

let abuja = new Terminal({
  city: "Abuja",
  location: "kubwa"
});

let kaduna = new Terminal({
  city: "Kaduna",
  location: "Rigasa"
});

let itinerary = null;

describe("Search controller", () => {
  beforeEach(async () => {
    try {
      await abuja.save();
      await kaduna.save();

      itinerary = new Itinerary({
        origin: abuja.id,
        destination: kaduna.id,
        departureDate: "06-09-2019",
        departureTime: "6:00AM",
        economyPrice: 900,
        firstClassPrice: 1200
      });

      await itinerary.save();
    } catch (error) {
      console.error(error.message);
      fail();
    }
  });

  afterEach(async () => {
    Terminal.deleteMany({});
    Itinerary.deleteMany({});
  });

  describe("/search", () => {
    it("should return results for a valid search", done => {
      const origin = "Abuja";
      const destination = "kaduna";
      const departureDate = "06-09-2019";
      const endpoint = `/api/v1/search?origin=${origin}&destination=${destination}&departureDate=${departureDate}`;

      chai
        .request(app)
        .get(endpoint)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.results).to.not.be.undefined;
          expect(res.body.results).to.be.instanceOf(Array);
          done();
        });
    });
  });
});
