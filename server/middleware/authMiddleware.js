import jwt from "jsonwebtoken";
export const authMiddleware = (req, res, next) => {
  // console.log("Auth middleware hit");
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      // console.log("No token provided");
      return res.status(401).json({ msg: "No token, authorization denied" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id, email: decoded.email };
    // console.log("Token verified:", req.user);
    next();
  } catch (err) {
    // console.error("Auth Middleware Error:", err.message);
    res.status(401).json({ msg: "Token is not valid" });
  }
};
