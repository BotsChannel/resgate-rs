/*
model Comment {
  id        String   @id @default(cuid())
  message   String
  author    String
  timestamp DateTime @default(now())
  person    Person   @relation(fields: [personId], references: [id])
  personId  String
}
*/

import { prisma } from '@/lib/prisma/config'

export const getComments = async ({ personId }: { personId: string }) => {
  return await prisma.comment.findMany({
    where: {
      personId,
    },
  })
}

export const postComment = async (message: string, author: string, personId: string) => {
  const data = {
    message,
    author,
    personId,
  }
  return await prisma.comment.create({ data })
}