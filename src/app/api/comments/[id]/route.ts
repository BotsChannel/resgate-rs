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
            id: string;
        };
    }
) {
    const comments = await getComments({ personId: context.params.id });
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
    const { author, message } = req.body as unknown as { author: string, message: string };
    const comment = await postComment(message, author, context.params.id);

    return Response.json(comment, { status: 201 });
}