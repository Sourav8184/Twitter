import express from "express";
import { verifyJWT } from "../middlewares/authMiddleware.js";
import {
  commentOnPost,
  createPost,
  deletePost,
  getAllPosts,
  getFollowingPosts,
  getLikedPosts,
  getUserPosts,
  likeUnlikePost,
} from "../controllers/postController.js";

/* ---------------------------------------------------------- */

const router = express.Router();

/* ---------------------------------------------------------- */

router.route("/create").post(verifyJWT, createPost);
router.route("/:id").delete(verifyJWT, deletePost);
router.route("/comment/:id").post(verifyJWT, commentOnPost);
router.route("/like/:id").post(verifyJWT, likeUnlikePost);
router.route("/all").get(verifyJWT, getAllPosts);
router.route("/likes/:id").get(verifyJWT, getLikedPosts);
router.route("/following").get(verifyJWT, getFollowingPosts);
router.route("/user/:username").get(verifyJWT, getUserPosts);

/* ---------------------------------------------------------- */

export default router;

/* ---------------------------------------------------------- */
