import { Request, Response } from "express";
import { 
    createCommentServices, 
    deleteCommentServices, 
    getCommentByIdServices, 
    getCommentsServices, 
    updateCommentServices 
} from "./comments.service"; 

// Controller functions for handling comment-related requests


export const getComments = async (req: Request, res: Response) => {
    try {
        const allComments = await getCommentsServices(); 
        if (allComments == null || allComments.length == 0) {
            res.status(404).json({ message: "No comments found" }); 
        } else {
            res.status(200).json(allComments);
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message || "Failed to fetch comments" }); 
    }
}

export const getCommentById = async (req: Request, res: Response) => {
    const commentId = parseInt(req.params.id); 
    if (isNaN(commentId)) {
        res.status(400).json({ error: "Invalid comment ID" }); 
        return; // Prevent further execution
    }
    try {
        const comment = await getCommentByIdServices(commentId); 
        if (comment == null) {
            res.status(404).json({ message: "Comment not found" }); 
        } else {
            res.status(200).json(comment);
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message || "Failed to fetch comment" }); 
    }
}

export const createComment = async (req: Request, res: Response) => {

    const { commentId, orderId, userId, commentText } = req.body;
    if (!commentId || !orderId || !userId || !commentText) {
        res.status(400).json({ error: "All fields are required" });
        return; // Prevent further execution
    }
    try {
        const newComment = await createCommentServices({ commentId, orderId, userId, commentText }); 
        if (newComment == null) {
            res.status(500).json({ message: "Failed to create comment" });
        } else {
            res.status(201).json(newComment);
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message || "Failed to create comment" }); // Updated message
    }
}

export const updateComment = async (req: Request, res: Response) => {
    const commentId = parseInt(req.params.id); 
    if (isNaN(commentId)) {
        res.status(400).json({ error: "Invalid comment ID" }); 
        return; // Prevent further execution
    }

    const { orderId, userId, commentText } = req.body;
    if (!orderId || !userId || !commentText) {
        res.status(400).json({ error: "All fields are required" });
        return; // Prevent further execution
    }
    try {
        const updatedComment = await updateCommentServices(commentId, { orderId, userId, commentText }); // Pass correct fields to service
        if (updatedComment == null) {
            res.status(404).json({ message: "Comment not found or failed to update" }); // Updated message
        } else {
            res.status(200).json(updatedComment);
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message || "Failed to update comment" }); // Updated message
    }
}


export const deleteComment = async (req: Request, res: Response) => {
    const commentId = parseInt(req.params.id); // Renamed variable
    if (isNaN(commentId)) {
        res.status(400).json({ error: "Invalid comment ID" }); // Updated message
        return; // Prevent further execution
    }
    try {
        const deletedComment = await deleteCommentServices(commentId); // Renamed variable and service call
        if (deletedComment) {
            res.status(200).json({ message: "Comment deleted successfully" }); // Updated message
        } else {
            res.status(404).json({ message: "Comment not found" }); // Updated message
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message || "Failed to delete comment" }); // Updated message
    }
}