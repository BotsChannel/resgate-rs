/*
model Comment {
  id        String   @id @default(cuid())
  message   String
  timestamp DateTime @default(now())
  card      Card     @relation(fields: [cardId], references: [id])
  cardId    String
}
*/

import { prisma } from '@/lib/prisma/config'

export const getComments = async ({ cardId }: { cardId: string }) => {
  return await prisma.comment.findMany({
    where: {
      cardId,
    },
  })
}

export const postComment = async ({
  message,
  cardId,
}: {
  message: string
  cardId: string
}) => {
  const data = {
    message,
    cardId,
  }
  return await prisma.comment.create({ data })
}