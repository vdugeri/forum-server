import { expect } from "chai";

import Transaction from "../../../src/api/client/models/transaction.model";

describe("Transaction model", () => {
  const transaction = new Transaction({
    amount: 3000,
    transactionRef: "xd56df",
    email: "user@example.com",
    paymentMethod: "CASH"
  });
  it("should create an instance of the Transaction model", done => {
    expect(transaction).to.be.instanceOf(Transaction);
    expect(transaction.id).to.not.be.null;
    expect(transaction.paymentMethod).to.eq("CASH");
    done();
  });
});
