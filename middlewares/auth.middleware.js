import jwt from "jsonwebtoken";

   export const authenticateUser = (req, res, next) => {
    let authHeader = req.headers["Authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ 
        success:false,
        message: "Access Denied: No Token Provided" 
      });
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
