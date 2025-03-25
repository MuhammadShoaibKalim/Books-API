import User from "../models/user.model.js";


export const getAllUsers = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access Denied: Admins only" });
    }

    const users = await User.find();
    res.status(200).json({ count: users.length, users });
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error: error.message });
  }
};


export const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // Exclude password
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile", error: error.message });
  }
};


export const updateUser = async (req, res) => {
  try {
    if (req.user.id !== req.params.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Access Denied" });
    }

    const { name, email, age, isActive, role } = req.body;

    if (req.user.role !== "admin" && role) {
      return res.status(403).json({ message: "Unauthorized: Cannot change role" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, age, isActive, role },
      { new: true, runValidators: true }
    );

    if (!updatedUser) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error: error.message });
  }
};
