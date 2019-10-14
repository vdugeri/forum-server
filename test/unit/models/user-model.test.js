import "babel-polyfill";
import { expect } from "chai";
import User from "../../../src/api/models/user.model";

describe("User model", () => {
  const testUser = new User({
    username: "username",
    password: "password",
    isActive: true
  });

  it("should instantiate a user", () => {
    expect(testUser).to.be.instanceOf(Object);
    expect(testUser._id).to.not.be.null;
    expect(testUser.isActive).to.be.true;
  });
});
