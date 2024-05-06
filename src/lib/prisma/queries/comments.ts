/*
model Comment {
  id        String   @id @default(cuid())
  message   String
  author    String
  timestamp DateTime @default(now())
  person    Person   @relation(fields: [personId], references: [id])
  personId  Number
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

export const postComment = async (message: string, author: string, personId: number) => {
  console.log("TYPE OF PERSON ID", personId, "MESSAGE", message, "AUTHOR", author);
  const data = {
    message,
    author,
    personId,
  };
  return await prisma.comment.create({ data });
};
