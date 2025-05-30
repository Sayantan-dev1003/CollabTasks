import User from "../models/User.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";
import mongoose from "mongoose";

// REGISTER USER
export const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    // Generate JWT
    const token = generateToken(newUser);

    // Set JWT in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        role: newUser.role,
      },
    });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// LOGIN USER
export const loginUser = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    if (user.role !== role)
      return res.status(400).json({ message: "Incorrect role" });

    // Generate JWT
    const token = generateToken(user);

    // Set JWT in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ACCEPT-INVITE-LOGIN
const acceptInvite = async (req, res) => {
  const { name, email, role, organizationId, password } = req.body;

  try {
    // Validate org ID
    if (!mongoose.Types.ObjectId.isValid(organizationId)) {
      return res.status(400).json({ error: 'Invalid organization ID' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      organization: new mongoose.Types.ObjectId(organizationId),
    });

    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error("Accept Invite Error:", err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

export { acceptInvite };

// LOGOUT USER
export const logoutUser = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "Strict",
  });

  res.status(200).json({ message: "Logout successful" });
};