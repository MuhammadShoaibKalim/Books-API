import jwt from "jsonwebtoken";

const accessToken = (userId, role) => {
  return jwt.sign({ id: userId, role }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

export default generateToken;
