import "babel-polyfill";
import { expect } from "chai";
import Terminal from "../../../src/api/client/models/terminal.model";

describe("Terminal model", () => {
  const terminal = new Terminal({
    city: "Abuja",
    location: "Idu"
  });

  it("should instantiate a terminal", () => {
    expect(terminal).to.be.instanceOf(Object);
    expect(terminal._id).to.not.be.null;
    expect(terminal.city).to.eq("Abuja");
    expect(terminal.location).to.eq("Idu");
  });
});
