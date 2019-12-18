import mongoose from "mongoose";
import bcrypt from "bcrypt";

import { requiredStringValidator, emailAddressValidator } from "api/validators";

const ExpertsSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name cannot be blank"],
      validate: requiredStringValidator
    },
    designation: {
      type: String,
      required: [true, "designation cannot be blank"],
      validate: requiredStringValidator
    },
    emailAddress: {
      type: String,
      required: [true, "email address cannot be blank"],
      validate: emailAddressValidator
    },
    password: {
      type: String,
      required: [true, "password cannot be blank"],
      validate: requiredStringValidator
    },
    image: {
      type: String
    }
  },
  { timestamps: { createdAt: "created_at" } }
);

ExpertsSchema.pre("save", async function() {
  const saltRounds = 10;
  const plainTextPassword = this.password;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = bcrypt.hash(plainTextPassword, salt);

  this.password = hashedPassword;
});

ExpertsSchema.methods.comparePasswords = async function(candidatePassword) {
  try {
    const matched = await bcrypt.compare(candidatePassword, this.password);
    return matched;
  } catch (error) {
    return false;
  }
};

export default mongoose.model("Expert", ExpertsSchema);
