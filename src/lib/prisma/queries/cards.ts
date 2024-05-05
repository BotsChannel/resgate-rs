/*
model Card {
  id        String    @id @default(cuid())
  type      String
  person    Person    @relation(fields: [personId], references: [id])
  personId  String
  comments  Comment[]
}
*/

import { prisma } from '@/lib/prisma/config'

export const getCards = async () => {
  return await prisma.card.findMany()
}

export const postCard = async ({
    type,
    personId,
}: {
    type: string,
    personId: string,
}) => {
    const data = {
        type,
        personId,
    }
    return await prisma.card.create({ data })
}