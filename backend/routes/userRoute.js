import express from "express";
import { verifyJWT } from "../middlewares/authMiddleware.js";
import {
  followUnfollowUser,
  getSuggestedUsers,
  getUserProfile,
  updateUser,
} from "../controllers/userControllers.js";

/* ---------------------------------------------------------- */

const router = express.Router();

/* ---------------------------------------------------------- */

router.route("/profile/:username").get(verifyJWT, getUserProfile);
router.route("/follow/:id").post(verifyJWT, followUnfollowUser);
router.route("/suggested").get(verifyJWT, getSuggestedUsers);
router.route("/update").post(verifyJWT, updateUser);

/* ---------------------------------------------------------- */

export default router;

/* ---------------------------------------------------------- */
