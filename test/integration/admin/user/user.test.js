import "babel-polyfill";
import chai from "chai";
import chaiHttp from "chai-http";
import { fail } from "assert";

chai.use(chaiHttp);

import { expect } from "chai";

import Admin from "../../../../src/api/admin/models/admin.model";
import app from "../../../../src/server";

let adminUser = null;

const endpoint = "/api/v1/admin/users";

describe("AdminUser controller", () => {
  beforeEach(async () => {
    try {
      adminUser = new Admin({
        username: "admin",
        password: "adminpassword",
        emailAddress: "admin@example.net"
      });
      await adminUser.save();
    } catch (error) {
      fail();
    }
  });

  afterEach(async () => {
    try {
      await Admin.deleteMany({});
    } catch (error) {
      fail();
    }
  });

  describe("GET /admin/users", () => {
    it("should get all admin users", done => {
      chai
        .request(app)
        .get(endpoint)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.admins).to.not.be.undefined;
          expect(res.body.admins).to.be.instanceOf(Array);
          expect(res.body.admins).to.have.length.greaterThan(0);
          done();
        });
    });
  });

  describe("POST /admin/users", () => {
    it("should create a valid admin user", done => {
      adminUser.username = "firstadmin";
      adminUser.emailAddress = "admin@example.com";

      chai
        .request(app)
        .post(endpoint)
        .send(adminUser)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.admin).to.not.be.undefined;
          expect(res.body.admin.username).to.eq("firstadmin");
          done();
        });
    });
    it("should fail to create a user without a username", done => {
      adminUser.username = "";
      chai
        .request(app)
        .post(endpoint)
        .send(adminUser)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.error.username.message).to.eq(
            "username cannot be blank"
          );
          done();
        });
    });
    it("should fail to create a user with an already existing email address", done => {
      chai
        .request(app)
        .post(endpoint)
        .send(adminUser)
        .end((err, res) => {
          expect(res).to.have.status(500);
          done();
        });
    });
  });

  describe("GET /admin/users/:id", () => {
    it("should return an admin with a valid id", done => {
      chai
        .request(app)
        .get(`${endpoint}/${adminUser.id}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.admin).to.not.be.undefined;
          expect(res.body.admin.username).to.eq(adminUser.username);
          done();
        });
    });
    it("should fail to fetch a user for an invalid id", done => {
      chai
        .request(app)
        .get(`${endpoint}/5d6f87810f6c7d0c039381ed`)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body.error).to.not.be.undefined;
          expect(res.body.error).to.eq("Invlaid admin id");
          done();
        });
    });
  });
  describe("POST /admin/roles/:id", () => {});
});
