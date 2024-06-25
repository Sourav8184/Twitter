import express from "express";
import {
  signup,
  login,
  logout,
  getMe,
} from "../controllers/authControllers.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";
verifyJWT;

/* ---------------------------------------------------------- */

const router = express.Router();

/* ---------------------------------------------------------- */

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/me").get(verifyJWT, getMe);

/* ---------------------------------------------------------- */

export default router;

/* ---------------------------------------------------------- */
