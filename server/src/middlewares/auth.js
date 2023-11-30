import jwt from "jsonwebtoken";

const config = process.env;

export const verifyToken = (req, res, next) => {
  let token = req.body.token || req.query.token || req.headers["authorization"];

  if (!token) {
    res.status(401).send("a token is required for authentication");
  }

  try {
    token = token.replace(/^Bearer\s+/, "");
    const decoded = jwt.verify(token, config.TOKEN_KEY);

    req.user = decoded;
  } catch (error) {
    return res.status(401).send("invalid token");
  }

  return next();
};
