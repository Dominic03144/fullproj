// src/comments/comment.route.ts
import { Router } from "express";
import {
  getComments,
  getCommentById,
  createComment,
  updateComment,
  deleteComment
} from "./comments.controller";

export const commentRouter = Router();

commentRouter.get("/comments", getComments);
commentRouter.get("/comments/:id", getCommentById);
commentRouter.post("/comments", createComment);
commentRouter.put("/comments/:id", updateComment);
commentRouter.delete("/comments/:id", deleteComment);
