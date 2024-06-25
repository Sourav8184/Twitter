import express from "express";
import { verifyJWT } from "../middlewares/authMiddleware.js";
import {
  deleteNotifications,
  getNotifications,
} from "../controllers/notificationControllers.js";

/* ---------------------------------------------------------- */

const router = express.Router();

/* ---------------------------------------------------------- */

router.route("/").get(verifyJWT, getNotifications);
router.route("/").delete(verifyJWT, deleteNotifications);

/* ---------------------------------------------------------- */

export default router;

/* ---------------------------------------------------------- */
