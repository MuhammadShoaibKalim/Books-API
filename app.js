import express from "express";
import dotenv from "dotenv";
import { connectdb } from "./config/Database.js";
import bookRoutes from "./routes/books.route.js";
import userRoutes from "./routes/user.route.js"; 
import authRoutes from "./routes/auth.route.js";


dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectdb();

// Middleware
app.use(express.json());

// Routes
app.use("/api/books", bookRoutes); 
app.use("/api/auth", authRoutes); 
app.use("/api/users", userRoutes); 


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
