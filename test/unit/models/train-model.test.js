import "babel-polyfill";
import { expect } from "chai";
import Train from "../../../src/api/client/models/train.model";

describe("Train model", () => {
  const train = new Train({
    model: "TRX45DK",
    capacity: 500,
    available: false,
    hasFirstClass: true,
    firstClassSeats: 24,
    economySeats: 440
  });

  it("should instantiate a train", () => {
    expect(train).to.be.instanceOf(Object);
    expect(train._id).to.not.be.null;
    expect(train.hasFirstClass).to.eq(true);
    expect(train.economySeats).to.eq(440);
  });
});
