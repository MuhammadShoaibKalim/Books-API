import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import accessToken from "../utils/generateToken.util.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, age, role } = req.body;

    if (!name || !email || !password || !age ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already exists" });
    
    const salt  = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ name, email, password: hashedPassword, age, role });
    await newUser.save();

    const token = accessToken(newUser._id, newUser.role);
    res.cookie("token", token, {
      httpOnly: true, 
      secure: true, 
      sameSite: "strict", 
      maxAge: 60 * 60 * 1000, 
    });


    res.status(201).json({ message: "User registered successfully", token, user: { id: newUser._id, role: newUser.role } });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ 
        success:false,
        message: "User does't exist"
     });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ 
        success:false,
        message: "Invalid credientals",
     });

    const token = accessToken(user._id, user.role);
    res.cookie("token", token, {
      httpOnly: true, 
      secure: true, 
      sameSite: "strict", 
      maxAge: 60 * 60 * 1000, 
    });

    res.status(200).json({ 
      success:true,
      message: "Login successful",
      token,
      user: { id: user._id, role: user.role },
      });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true, 
      secure: true, 
      sameSite: "strict", 
      maxAge: 60 * 60 * 1000, 
    });
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: "Error logging out", error: error.message });
  }
}
