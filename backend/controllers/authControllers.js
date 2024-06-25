import userModel from "../models/userModel.js";
import bcryptjs from "bcryptjs";

/* ---------------------------------------------------------- */
export const signup = async (req, res) => {
  try {
    const { username, email, fullName, password } = req.body;

    // Input Validation
    if (
      [username, email, fullName, password].some(
        (field) => field?.trim() === ""
      )
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Check for existing username or email
    const existedUser = await userModel.findOne({
      $or: [{ username }, { email }],
    });

    if (existedUser) {
      if (existedUser.username === username) {
        return res.status(400).json({ error: "Username already taken" });
      } else {
        return res.status(400).json({ error: "Email already in use" });
      }
    }

    // Password Validation
    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters long" });
    }

    // Hash password securely
    const hashPassword = bcryptjs.hashSync(password, 16);

    // Create user
    const user = await userModel.create({
      username: username.toLowerCase(),
      fullName,
      email,
      password: hashPassword,
    });

    // Respond with created user (excluding password)
    const createdUser = await userModel.findById(user._id).select("-password");
    res.status(201).json(createdUser);
  } catch (error) {
    console.error(error); // Log the actual error for debugging
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/* ---------------------------------------------------------- */

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(password);

    if (!username || !password || username === "" || password === "") {
      return res.status(400).json({ error: "All field requried" });
    }

    const user = await userModel.findOne({
      $or: [{ username }],
    });

    if (!user) {
      return res.status(400).json({ error: "Username not found" });
    }

    const isPasswordCorrect = bcryptjs.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid Password" });
    }

    const accessToken = user.generateAccessToken();

    const loggedInUser = await userModel.findById(user._id).select("-password");

    const optionsForCookieNotChangeByFrontend = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, optionsForCookieNotChangeByFrontend)
      .json(loggedInUser);
  } catch (error) {
    console.error(error); // Log the actual error for debugging
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/* ---------------------------------------------------------- */

export const logout = async (req, res) => {
  try {
    return res
      .clearCookie("accessToken")
      .status(200)
      .json("User logout Successfully");
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/* ---------------------------------------------------------- */

export const getMe = async (req, res) => {
  const user = await userModel.findById(req.user._id).select("-password");
  return res.status(200).json(user);
};

/* ---------------------------------------------------------- */
