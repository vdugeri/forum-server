import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const secret = process.env.TOKEN_SECRET;

export let generateToken = async user => {
  const token = jwt.sign(
    {
      data: user
    },
    secret,
    { expiresIn: "365 days" }
  );

  return { token, user };
};

export let validateToken = async token => {
  try {
    jwt.verify(token, secret);
    return true;
  } catch (ex) {
    return false;
  }
};
