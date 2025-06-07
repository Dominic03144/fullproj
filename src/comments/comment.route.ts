import { Router } from "express";
import { 
    createComment, 
    deleteComment, 
    getCommentById, 
    getComments, 
    updateComment 
} from "./comments.controller"; // Updated import to comments.controller and function names

export const commentRouter = Router(); // Renamed ownerRouter to commentRouter

// Comment routes definition

// Get all comments
commentRouter.get('/comments', getComments); // Changed path and controller function

// Get comment by ID
commentRouter.get('/comments/:id', getCommentById); // Changed path and controller function

// Create a new comment
commentRouter.post('/comments', createComment); // Changed path and controller function

// Update an existing comment
commentRouter.put('/comments/:id', updateComment); // Changed path and controller function

// Delete an existing comment
commentRouter.delete('/comments/:id', deleteComment); // Changed path and controller function