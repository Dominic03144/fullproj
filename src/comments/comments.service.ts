import { eq } from "drizzle-orm";
import { db } from "../drizzle/db";

import { TCommentInsert, TCommentSelect, commentTable } from "../drizzle/schema";


// CRUD Operations for Comment entity


export const getCommentsServices = async(): Promise<TCommentSelect[] | null> => {
    return await db.query.commentTable.findMany({});
}


export const getCommentByIdServices = async(commentId: number): Promise<TCommentSelect | undefined> => {
    return await db.query.commentTable.findFirst({
        where: eq(commentTable.commentId, commentId) 
    })
}


export const createCommentServices = async(comment: TCommentInsert): Promise<string> => {
    await db.insert(commentTable).values(comment).returning();
    return "Comment created successfully 🎉";
}


export const updateCommentServices = async(commentId: number, comment: Partial<TCommentInsert>): Promise<string> => {
    await db.update(commentTable).set(comment).where(eq(commentTable.commentId, commentId));
    return "Comment updated successfully 😎";
}


export const deleteCommentServices = async(commentId: number): Promise<string> => {
    await db.delete(commentTable).where(eq(commentTable.commentId, commentId));
    return "Comment deleted successfully 🎉"
}