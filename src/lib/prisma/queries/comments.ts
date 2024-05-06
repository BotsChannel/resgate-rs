/*
model Comment {
  id        Int      @id @default(autoincrement())
  message   String
  author    String
  timestamp Int
  person    Person   @relation(fields: [personId], references: [id])
  personId  Int
}
*/

import { prisma } from "@/lib/prisma/config";

export const getComments = async ({ personId }: { personId: number }) => {
  return await prisma.comment.findMany({
    where: {
      personId,
    },
  });
};

export const postComment = async (
  message: string,
  author: string,
  timestamp: number,
  personId: number
) => {
  const data = {
    message,
    author,
    timestamp,
    personId,
  };
  return await prisma.comment.create({
    data,
  });
};
