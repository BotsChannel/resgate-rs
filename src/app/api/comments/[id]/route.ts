/*
model Comment {
  id        Int      @id @default(autoincrement())
  message   String
  author    String
  timestamp DateTime @default(now())
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
      id: number;
    };
  }
) {
  const parsedPersonId =
    typeof context.params.id === "number" ? context.params.id : Number(context.params.id);
  const comments = await getComments({ personId: parsedPersonId });
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
  const parsedPersonId =
    typeof context.params.id === "number" ? context.params.id : Number(context.params.id);
  const comment = await postComment(message, author, parsedPersonId);

  return Response.json(comment, { status: 201 });
}
