const admin = require("../config/firebaseAdmin");

const verifyToken = async (req, res, next) => {
  const authHeader = req?.headers?.authorization;
  console.log("Header:", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const idToken = authHeader.split("Bearer ")[1];
 

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken; // Add decoded token info to request
    next();
  } catch (error) {
    console.error("Error verifying Firebase ID token:", error);
    return res.status(403).json({ message: "Unauthorized: Invalid token" });
  }
};

module.exports = verifyToken;
