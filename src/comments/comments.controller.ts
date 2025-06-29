// src/comments/comments.controller.ts
import { Request, Response } from "express";
import {
  getCommentsServices,
  getCommentByIdServices,
  createCommentServices,
  updateCommentServices,
  deleteCommentServices
} from "./comments.service";

export const getComments = async (req: Request, res: Response) => {
  try {
    const comments = await getCommentsServices();
    res.status(200).json(comments);
  } catch (error) {
    console.error("❌ Error fetching comments:", error);
    res.status(500).json({ error: "Failed to fetch comments" });
  }
};

export const getCommentById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const comment = await getCommentByIdServices(id);
    if (comment) {
      res.status(200).json(comment);
    } else {
      res.status(404).json({ error: "Comment not found" });
    }
  } catch (error) {
    console.error("❌ Error fetching comment by ID:", error);
    res.status(500).json({ error: "Failed to fetch comment" });
  }
};

export const createComment = async (req: Request, res: Response) => {
  try {
    const { userId, commentText, commentType } = req.body;

    console.log("📥 Creating comment with:", req.body);

    const newComment = await createCommentServices({ userId, commentText, commentType });

    res.status(201).json(newComment);
  } catch (error) {
    console.error("❌ Error creating comment:", error);
    res.status(500).json({ error: "Failed to create comment" });
  }
};

export const updateComment = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const { userId, commentText } = req.body;
    const updated = await updateCommentServices(id, { userId, commentText });
    if (updated) {
      res.status(200).json(updated);
    } else {
      res.status(404).json({ error: "Comment not found" });
    }
  } catch (error) {
    console.error("❌ Error updating comment:", error);
    res.status(500).json({ error: "Failed to update comment" });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const deleted = await deleteCommentServices(id);
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: "Comment not found" });
    }
  } catch (error) {
    console.error("❌ Error deleting comment:", error);
    res.status(500).json({ error: "Failed to delete comment" });
  }
};
