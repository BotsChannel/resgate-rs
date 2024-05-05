/*
model Person {
  id        String   @id @default(cuid())
  name      String
  age       Int
  status    String
  photoUrl  String
  cidade    String
  endereco  String
  abrigo    String
  entrada   DateTime
  card      Card[]
}
*/

import { prisma } from '@/lib/prisma/config'

export const getPeople = async () => {
  return await prisma.person.findMany()
}

export const postPerson = async ({
  name,
  age,
  status,
  photoUrl,
  cidade,
  endereco,
  abrigo,
  entrada,
}: {
  name: string
  age: number
  status: string
  photoUrl: string
  cidade: string
  endereco: string
  abrigo: string
  entrada: Date
}) => {
  const data = {
    name,
    age,
    status,
    photoUrl,
    cidade,
    endereco,
    abrigo,
    entrada,
  }
  return await prisma.person.create({ data })
}

export const updatePerson = async ({
  id,
  name,
  age,
  status,
  photoUrl,
  cidade,
  endereco,
  abrigo,
  entrada,
}: {
  id: string
  name: string
  age: number
  status: string
  photoUrl: string
  cidade: string
  endereco: string
  abrigo: string
  entrada: Date
}) => {
  const data = {
    name,
    age,
    status,
    photoUrl,
    cidade,
    endereco,
    abrigo,
    entrada,
  }
  return await prisma.person.update({
    where: {
      id,
    },
    data,
  })
}