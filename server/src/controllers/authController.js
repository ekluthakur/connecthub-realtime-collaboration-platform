import bcrypt from "bcryptjs";
import validator from "validator";

import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password)
      return res.status(400).json({
        message: "All fields are required",
      });

    if (!validator.isEmail(email))
      return res.status(400).json({
        message: "Invalid Email",
      });

    if (password.length < 6)
      return res.status(400).json({
        message: "Password should be minimum 6 characters",
      });

    const exists = await User.findOne({ email });

    if (exists)
      return res.status(400).json({
        message: "Email already exists",
      });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      token: generateToken(user._id),
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }
};

export const login = async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user)
      return res.status(401).json({
        message: "Invalid Credentials",
      });

    const match = await bcrypt.compare(
      password,
      user.password
    );

    if (!match)
      return res.status(401).json({
        message: "Invalid Credentials",
      });

    res.json({
      success: true,
      token: generateToken(user._id),
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }

};