import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
/* ---------------------------------------------------------- */

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },

    fullName: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
      minLength: 6,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],

    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],

    profileImg: {
      type: String,
      default: "",
    },

    coverImg: {
      type: String,
      default: "",
    },

    bio: {
      type: String,
      default: "",
    },

    link: {
      type: String,
      default: "",
    },

    likedPosts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        default: [],
      },
    ],
  },
  { timestamps: true }
);

/* ----------------------------------------------------------------- */

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcryptjs.hash(this.password, 16);
  next();
});

/* ---------------------------------------------------------- */

userSchema.methods.generateAccessToken = function () {
  const accessToken = jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullName: this.fullName,
    },
    process.env.JWT_TOKEN_SECRET,
    {
      expiresIn: process.env.JWT_TOKEN_EXPIRY,
    }
  );
  return accessToken;
};

/* ---------------------------------------------------------- */

const User = mongoose.model("User", userSchema);

/* ---------------------------------------------------------- */

export default User;

/* ---------------------------------------------------------- */
