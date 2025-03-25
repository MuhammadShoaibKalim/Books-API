import jwt from "jsonwebtoken";

  export const authenticateUser = (req, res, next) => {
    let token = req.header("Authorization");
  
    if (!token) {
      return res.status(401).json({ message: "Access Denied: No Token Provided" });
    }
  
    if (token.startsWith("Bearer ")) {
      token = token.split(" ")[1];
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid Token", error: error.message });
    }
  };
  

  export const isAdmin = (req, res, next) => {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access Denied: Admins only" });
    }
    next();
  };