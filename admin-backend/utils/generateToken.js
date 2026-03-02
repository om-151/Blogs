const jwt = require("jsonwebtoken");

// accepts id and optional role; including role makes it easier to authorize without extra DB lookup
const generateToken = (id, role) => {
  const payload = { id };
  if (role) payload.role = role;
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
};

module.exports = generateToken;
