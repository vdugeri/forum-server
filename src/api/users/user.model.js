import mongoose from "mongoose";
import bcrypt from "bcrypt";
import {
  requiredStringValidator,
  emailAddressValidator,
  userTypeValidator
} from "api/validators";

const userSchema = mongoose.Schema(
  {
    password: {
      type: String,
      required: [true, "Password cannot be blank"],
      validate: requiredStringValidator
    },
    isActive: { type: Boolean, default: true },
    firstName: {
      type: String,
      required: [true, "First name cannot be blank"],
      validate: requiredStringValidator
    },
    lastName: {
      type: String,
      required: [true, "Last name cannot be blank"],
      validate: requiredStringValidator
    },
    emailAddress: {
      type: String,
      required: [true, "Email address cannot be blank"],
      validate: emailAddressValidator
    },
    phone: {
      type: String
    },
    location: {
      type: String
    },
    type: {
      type: String,
      default: "USER",
      validate: userTypeValidator
    },
    primarySkill: {
      type: String
    },
    otherSkills: {
      type: [String]
    }
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

userSchema.pre("save", async function() {
  const saltRounds = 10;
  const plainTextPassword = this.password;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(plainTextPassword, salt);

  this.password = hashedPassword;
});

userSchema.methods.comparePasswords = async function(candidatePassword) {
  try {
    const matched = await bcrypt.compare(candidatePassword, this.password);
    return matched;
  } catch (ex) {
    return false;
  }
};

const User = mongoose.model("User", userSchema);

export default User;
