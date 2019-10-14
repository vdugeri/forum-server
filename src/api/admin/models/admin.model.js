import mongoose from "mongoose";
import bcrypt from "bcrypt";

const adminSchema = mongoose.Schema({
  username: { type: String, required: [true, "username cannot be blank"] },
  emailAddress: {
    type: String,
    required: [true, "email address cannot be blank"],
    validate: {
      validator: v => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(v);
      },
      message: props => `${props.value} is not a valid email address`
    }
  },
  password: {
    type: String,
    required: [true, "Password cannot be blank"],
    validate: {
      validator: v => {
        return v && v.trim() && v.length >= 8;
      },
      message: props => `${props.value} must be at least 8 characters long`
    }
  }
});

adminSchema.path("emailAddress").validate(async value => {
  const emailCount = await mongoose.models.Admin.countDocuments({
    emailAddress: value
  });
  return !emailCount;
}, "Email already exists");

adminSchema.pre("save", async function() {
  try {
    const saltRounds = 10;
    const plainTextPassword = this.password;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(plainTextPassword, salt);

    this.password = hashedPassword;
  } catch (error) {
    console.log(error.message);
  }
});

adminSchema.methods.comparePasswords = async function(candidatePassword) {
  try {
    const matched = bcrypt.compare(candidatePassword, this.password);
    return matched;
  } catch (ex) {
    return false;
  }
};

export default mongoose.model("Admin", adminSchema);
