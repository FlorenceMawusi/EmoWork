const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("token");
  if (!token) return res.status(401).json({ msg: "Auth Error, access denied." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded.user;
    next();
  } catch (e) {
    console.error(e); 
    res.status(401).send({ msg: "Access Denied" });
  }
};
