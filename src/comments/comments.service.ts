// src/comments/comments.service.ts
import { db } from "../drizzle/db";
import { commentsTable } from "../drizzle/schema";
import { eq } from "drizzle-orm";

// Get all comments
export async function getCommentsServices() {
  return await db.select().from(commentsTable);
}

// Get comment by ID
export async function getCommentByIdServices(commentId: number) {
  const comment = await db
    .select()
    .from(commentsTable)
    .where(eq(commentsTable.commentId, commentId));
  return comment[0] || null;
}

// Create comment
export async function createCommentServices(data: {
  userId: number;
  commentText: string;
  commentType: string;
}) {
  const result = await db.insert(commentsTable).values(data).returning();
  return result[0]; // First inserted row
}

// Update comment
export async function updateCommentServices(
  commentId: number,
  data: { userId: number; commentText: string }
) {
  const result = await db
    .update(commentsTable)
    .set(data)
    .where(eq(commentsTable.commentId, commentId))
    .returning();
  return result[0] || null;
}

// Delete comment
export async function deleteCommentServices(commentId: number) {
  const result = await db
    .delete(commentsTable)
    .where(eq(commentsTable.commentId, commentId));
  return (result.rowCount ?? 0) > 0 || Array.isArray(result); // depending on DB
}
