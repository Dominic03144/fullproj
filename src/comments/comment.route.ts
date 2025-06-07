import { Router } from "express";
import { 
    createComment, 
    deleteComment, 
    getCommentById, 
    getComments, 
    updateComment 
} from "./comments.controller"; 

export const commentRouter = Router(); 



// Get all comments
commentRouter.get('/comments', getComments); 

// Get comment by ID
commentRouter.get('/comments/:id', getCommentById); 

// Create a new comment
commentRouter.post('/comments', createComment); 

// Update an existing comment
commentRouter.put('/comments/:id', updateComment); 

// Delete an existing comment
commentRouter.delete('/comments/:id', deleteComment); 