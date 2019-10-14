import "babel-polyfill";
import { expect } from "chai";
import Itinerary from "../../../src/api/client/models/itinerary.model";
import Terminal from "../../../src/api/client/models/terminal.model";

describe("Itinerary model", () => {
  const abuja = new Terminal({ city: "Abuja", location: "Idu" });
  const lagos = new Terminal({ city: "Lagos", location: "Yaba" });
  const itinerary = new Itinerary({
    origin: abuja,
    destination: lagos,
    stops: [abuja, lagos],
    departureDate: "12-10-2019",
    departureTime: "6:00am",
    economyPrice: 1000,
    firstClassPrice: 1200
  });

  it("should instantiate an Itinerary", () => {
    expect(itinerary).to.be.instanceOf(Object);
    expect(itinerary._id).to.not.be.null;
    expect(itinerary.origin.id).to.eq(abuja.id);
    expect(itinerary.destination.id).to.eq(lagos.id);
  });
});
