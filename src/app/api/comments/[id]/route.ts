/*
model Comment {
  id        Int      @id @default(autoincrement())
  message   String
  author    String
  timestamp BigInt
  person    Person   @relation(fields: [personId], references: [id])
  personId  Int
}
*/

import { getComments, postComment } from "@/lib/prisma/queries/comments";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  context: {
    params: {
      id: string;
    };
  }
) {
  const comments = await getComments({ personId: Number(context.params.id) });
  comments.forEach((comment: { timestamp: number; }) => {
    comment.timestamp = Number(comment.timestamp);
  });
  return Response.json(comments, { status: 200 });
}

export async function POST(
  req: NextRequest,
  context: {
    params: {
      id: string;
    };
  }
) {
  const data = await req.json();
  const { author, message, timestamp } = data;
  const comment = await postComment(message, author, timestamp, Number(context.params.id));

  return Response.json(comment, { status: 201 });
}